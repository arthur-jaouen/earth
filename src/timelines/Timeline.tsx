import dayjs from 'dayjs';
import { FunctionComponent, useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { Dispatch } from '../app/Store';
import { Card, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Loading } from '../lib/Loading';
import { NotFound } from '../lib/NotFound';
import { Range } from '../lib/Range';
import { useIsVisible } from '../lib/Visible';
import { Picture } from '../pictures/Picture';
import { Sources } from '../sources/Sources';
import { TimelineModel } from './TimelineModel';
import { useTimeline } from './TimelineSlice';

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
      dispatch(timeline.loadData(id));
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
        onChange={(value) => dispatch(timeline.loadAtOffset(id, value))}
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
      <CardSource name={Sources[timeline.source].name} url={Sources[timeline.source].url} />
    </CardSubtitle>
    <Timeline id={id} timeline={timeline} />
  </Card>
);
