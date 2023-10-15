import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { TimelineModel, timelines } from '../model/TimelineModel';
import { setPicturePending } from './PictureSlice';
import { Dispatch, State } from './Store';

export type TimelineState = {
  state: 'pending' | 'loading' | 'success' | 'error';
  latest?: string;
  offset?: number;
  error?: unknown;
};

export type TimelineSliceState = { [id: string]: TimelineState };

const initialState: TimelineSliceState = Object.fromEntries(
  Object.keys(timelines).map((id) => [id, { state: 'pending' }]),
);

export const TimelineSlice = createSlice({
  name: 'timelines',
  initialState,
  reducers: {
    setTimelineLoading(
      state: TimelineSliceState,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) {
      state[id] = {
        state: 'loading',
      };
    },

    setTimelineSuccess(
      state: TimelineSliceState,
      { payload: { id, latest } }: PayloadAction<{ id: string; latest: string }>,
    ) {
      state[id] = {
        state: 'success',
        latest,
        offset: 0,
      };
    },

    setTimelineError(
      state: TimelineSliceState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      state[id] = {
        state: 'error',
        error,
      };
    },

    setTimelineOffset(
      state: TimelineSliceState,
      { payload: { id, offset } }: PayloadAction<{ id: string; offset: number }>,
    ) {
      state[id].offset = offset;
    },
  },
});

export const { setTimelineLoading, setTimelineSuccess, setTimelineError, setTimelineOffset } =
  TimelineSlice.actions;

export const useTimeline = (id: string) => useSelector((state: State) => state.timelines[id]);

export const loadTimeline =
  (id: string, timeline: TimelineModel) =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const { state } = getState().timelines[id];

    if (state !== 'error' && state !== 'pending') {
      return;
    }

    dispatch(setTimelineLoading({ id }));

    try {
      const date = await timeline.getLatestDate();

      dispatch(setPicturePending({ id: timeline.getPictureId(id, date) }));
      dispatch(setTimelineSuccess({ id, latest: date }));

      return;
    } catch (error) {
      console.error(error);

      dispatch(setTimelineError({ id, error }));
    }
  };

export const loadTimelineOffset =
  (id: string, offset: number, timeline: TimelineModel) =>
  async (dispatch: Dispatch, getState: () => State) => {
    const { state, latest } = getState().timelines[id];

    if (state === 'error' || state === 'pending') {
      return;
    }

    const date = dayjs(latest)
      .add(offset * timeline.duration, timeline.unit)
      .toISOString();

    const pictureId = timeline.getPictureId(id, date);
    const picture = getState().pictures[pictureId];

    if (!picture) {
      dispatch(setPicturePending({ id: pictureId }));
    }

    dispatch(setTimelineOffset({ id, offset }));
  };
