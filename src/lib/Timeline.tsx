import dayjs, { ManipulateType } from 'dayjs';
import { FunctionComponent, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../store/Store';
import {
  getTimelinePictureId,
  getTimelinePictureUrl,
  loadTimeline,
  loadTimelineOffset,
  useTimeline,
} from '../store/Timelines';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { Picture, PictureProps } from './Picture';
import { Range } from './Range';
import { useIsVisible } from './Visible';

import './Timeline.scss';

export type TimelineProps = Omit<PictureProps, 'url'> & {
  id: string;
  template: string;
  duration?: number;
  unit?: ManipulateType;
  tries?: number;
};

export const Timeline: FunctionComponent<TimelineProps> = ({
  id,
  template,
  width,
  height,
  duration = 1,
  unit = 'day',
  tries = 10,
  validity = 365 * 24 * 3600,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, latest, offset } = useTimeline(id);

  useEffect(() => {
    if (visible) {
      dispatch(loadTimeline(id, template, tries, duration, unit));
    }
  }, [dispatch, visible, id, template, tries, duration, unit]);

  const aspectRatio = height && width ? width / height : undefined;
  const date = dayjs(latest!)
    .add((offset || 0) * duration, unit)
    .toISOString();

  return (
    <div className={'timeline timeline-' + state}>
      {state === 'loading' || state === 'pending' ? (
        <Loading style={{ aspectRatio }} />
      ) : state === 'error' ? (
        <NotFound style={{ aspectRatio }} />
      ) : state === 'success' ? (
        <Picture
          id={getTimelinePictureId(id, date)}
          url={getTimelinePictureUrl(template, date)}
          width={width}
          height={height}
          validity={validity}
          {...props}
        />
      ) : null}
      <Range
        min={-30}
        max={0}
        value={offset || 0}
        onChange={(value) => dispatch(loadTimelineOffset(id, value, duration, unit))}
      />
    </div>
  );
};
