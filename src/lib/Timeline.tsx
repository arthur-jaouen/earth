import dayjs from 'dayjs';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { sources } from '../model/SourceModel';
import { TimelineModel } from '../model/TimelineModel';
import { Dispatch } from '../store/Store';
import { loadTimeline, loadTimelineOffset, useTimeline } from '../store/TimelineSlice';
import { Card, CardSource, CardSubtitle, CardTitle } from './Card';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { Picture } from './Picture';
import { Range } from './Range';
import { useIsVisible } from './Visible';

import './Timeline.scss';

export type TimelineProps = {
  id: string;
  timeline: TimelineModel;
};

export const Timeline: FunctionComponent<TimelineProps> = ({ id, timeline }) => {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, latest, offset } = useTimeline(id);

  useEffect(() => {
    if (visible) {
      dispatch(loadTimeline(id, timeline));
    }
  }, [dispatch, visible, id, timeline]);

  const date = dayjs(latest!)
    .add((offset || 0) * timeline.duration, timeline.unit)
    .toISOString();

  const picture = useMemo(() => timeline.getPictureModel(date), [timeline, date]);

  return (
    <div className={'timeline timeline-' + state}>
      {state === 'loading' || state === 'pending' ? (
        <Loading style={{ aspectRatio: timeline.aspectRatio }} />
      ) : state === 'error' ? (
        <NotFound style={{ aspectRatio: timeline.aspectRatio }} />
      ) : state === 'success' ? (
        <Picture id={timeline.getPictureId(id, date)} picture={picture} />
      ) : null}
      <Range
        min={-30}
        max={0}
        value={offset || 0}
        onChange={(value) => dispatch(loadTimelineOffset(id, value, timeline))}
      />
    </div>
  );
};

export type TimelineCardProps = {
  id: string;
  timeline: TimelineModel;
};

export const TimelineCard: FunctionComponent<TimelineCardProps> = ({ id, timeline }) => (
  <Card>
    <CardTitle>{timeline.title}</CardTitle>
    <CardSubtitle>
      {timeline.subtitle}&nbsp;
      <CardSource name={sources[timeline.source].name} url={sources[timeline.source].url} />
    </CardSubtitle>
    <Timeline id={id} timeline={timeline} />
  </Card>
);
