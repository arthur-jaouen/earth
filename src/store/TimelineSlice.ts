import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { timelines } from '../model/TimelineModel';
import { State } from './Store';

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
      {
        payload: { id, latest, offset },
      }: PayloadAction<{ id: string; latest: string; offset: number }>,
    ) {
      state[id] = {
        state: 'success',
        latest,
        offset,
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
