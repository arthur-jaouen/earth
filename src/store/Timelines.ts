import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs, { ManipulateType } from 'dayjs';
import { useSelector } from 'react-redux';
import { timelines } from '../data/timelines';
import { setPicturePending } from './Pictures';
import { Dispatch, State } from './Store';

export type TimelineState = {
  state: 'pending' | 'loading' | 'success' | 'error';
  latest?: string;
  offset?: number;
  error?: unknown;
};

export type TimelineStates = { [id: string]: TimelineState };

const initialState: TimelineStates = Object.fromEntries(
  Object.keys(timelines).map((id) => [id, { state: 'pending' }]),
);

export const TimelineSlice = createSlice({
  name: 'timelines',
  initialState,
  reducers: {
    setTimelineLoading(state: TimelineStates, { payload: { id } }: PayloadAction<{ id: string }>) {
      state[id] = {
        state: 'loading',
      };
    },

    setTimelineSuccess(
      state: TimelineStates,
      { payload: { id, latest } }: PayloadAction<{ id: string; latest: string }>,
    ) {
      state[id] = {
        state: 'success',
        latest,
        offset: 0,
      };
    },

    setTimelineError(
      state: TimelineStates,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      state[id] = {
        state: 'error',
        error,
      };
    },

    setTimelineOffset(
      state: TimelineStates,
      { payload: { id, offset } }: PayloadAction<{ id: string; offset: number }>,
    ) {
      state[id].offset = offset;
    },
  },
});

export const { setTimelineLoading, setTimelineSuccess, setTimelineError, setTimelineOffset } =
  TimelineSlice.actions;

export const useTimeline = (id: string) => useSelector((state: State) => state.timelines[id]);

export const getTimelinePictureId = (id: string, date: string) => `${id}_${date}`;

export const getTimelinePictureUrl = (template: string, date: string) =>
  `https://wsrv.nl?url=${dayjs(date).format(template)}`;

export const getTimelineLatestDate = async (
  template: string,
  tries: number,
  duration: number,
  unit: ManipulateType,
): Promise<string> => {
  const start = dayjs().startOf(unit);

  for (let count = 0; count < tries; count++) {
    try {
      const date = start.subtract(count * duration, unit).toISOString();
      const response = await fetch(getTimelinePictureUrl(template, date), { method: 'HEAD' });

      if (response.status === 200) {
        return date;
      }
    } catch (error) {
      // Nothing, just try next date
    }
  }

  throw Error('Not found');
};

export const loadTimeline =
  (id: string, template: string, tries: number, duration: number, unit: ManipulateType) =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const timeline = getState().timelines[id];

    if (timeline.state !== 'error' && timeline.state !== 'pending') {
      return;
    }

    dispatch(setTimelineLoading({ id }));

    try {
      const date = await getTimelineLatestDate(template, tries, duration, unit);

      dispatch(setPicturePending({ id: getTimelinePictureId(id, date) }));
      dispatch(setTimelineSuccess({ id, latest: date }));

      return;
    } catch (error) {
      console.error(error);

      dispatch(setTimelineError({ id, error }));
    }
  };

export const loadTimelineOffset =
  (id: string, offset: number, duration: number, unit: ManipulateType) =>
  async (dispatch: Dispatch, getState: () => State) => {
    const timeline = getState().timelines[id];

    if (timeline.state === 'error' || timeline.state === 'pending') {
      return;
    }

    const date = dayjs(timeline.latest)
      .add(offset * duration, unit)
      .toISOString();

    const pictureId = getTimelinePictureId(id, date);
    const picture = getState().pictures[pictureId];

    if (!picture) {
      dispatch(setPicturePending({ id: pictureId }));
    }

    dispatch(setTimelineOffset({ id, offset }));
  };
