import dayjs from 'dayjs';
import { useCallback, useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dispatch, State } from '../app/Store';
import { useIsVisible } from '../lib/Visible';
import { PictureModel } from '../pictures/PictureModel';
import { setPicturePending } from '../pictures/PictureSlice';
import { TimelineModel } from './TimelineModel';
import {
  TimelineState,
  setTimelineError,
  setTimelineLoading,
  setTimelineOffset,
  setTimelineSuccess,
} from './TimelineSlice';

export function useTimeline(
  timeline: TimelineModel,
): TimelineState & { picture: PictureModel; changeOffset: (offset: number) => void } {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const timelineState = useSelector((state: State) => state.timelines[timeline.id]);

  useEffect(() => {
    if (visible) {
      dispatch(loadTimeline(timeline));
    }
  }, [dispatch, visible, timeline]);

  const date = dayjs(timelineState.latest!)
    .add((timelineState.offset || 0) * timeline.duration, timeline.unit)
    .toISOString();

  const picture = useMemo(() => timeline.getPictureModel(date), [timeline, date]);

  const changeOffset = useCallback(
    (offset: number) => dispatch(loadTimelineOffset(timeline, offset)),
    [dispatch, timeline],
  );

  return { ...timelineState, picture, changeOffset };
}

export async function getLatestDate(timeline: TimelineModel): Promise<string> {
  const start = dayjs().startOf(timeline.unit);

  for (let count = 0; count < timeline.tries; count++) {
    try {
      const date = start.subtract(count * timeline.duration, timeline.unit).toISOString();
      const response = await fetch(timeline.getPictureUrl(date), { method: 'HEAD' });

      if (response.status === 200) {
        return date;
      }
    } catch (error) {
      // Nothing, just try next date
    }
  }

  throw Error('Not found');
}

export function loadTimeline(timeline: TimelineModel) {
  return async (dispatch: Dispatch): Promise<void> => {
    dispatch(setTimelineLoading({ id: timeline.id }));

    try {
      const date = await getLatestDate(timeline);

      dispatch(setPicturePending({ id: timeline.getPictureId(date) }));
      dispatch(setTimelineSuccess({ id: timeline.id, latest: date, offset: 0 }));

      return;
    } catch (error) {
      console.error(error);

      dispatch(setTimelineError({ id: timeline.id, error }));
    }
  };
}

export function loadTimelineOffset(timeline: TimelineModel, offset: number) {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { latest } = getState().timelines[timeline.id];

    const date = dayjs(latest)
      .add(offset * timeline.duration, timeline.unit)
      .toISOString();

    const pictureId = timeline.getPictureId(date);
    const picture = getState().pictures[pictureId];

    if (!picture) {
      dispatch(setPicturePending({ id: pictureId }));
    }

    dispatch(setTimelineOffset({ id: timeline.id, offset }));
  };
}
