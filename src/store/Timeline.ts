import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs, { ManipulateType } from 'dayjs';
import { useSelector } from 'react-redux';
import { timelines } from '../data/timelines';
import { loadImage, setImageSuccess } from './Image';
import { Dispatch, State } from './Store';

export type TimelineItem = {
  state: 'pending' | 'loading' | 'success' | 'error';
  latest?: string;
  offset?: number;
  error?: unknown;
};

export type TimelineState = { [id: string]: TimelineItem };

const initialState: TimelineState = Object.fromEntries(
  Object.keys(timelines).map((id) => [id, { state: 'pending' }]),
);

export const TimelineSlice = createSlice({
  name: 'timelines',
  initialState,
  reducers: {
    setTimelineLoading(state: TimelineState, { payload: { id } }: PayloadAction<{ id: string }>) {
      const timeline = state[id];

      if (timeline) {
        timeline.state = 'loading';
        timeline.latest = undefined;
        timeline.offset = undefined;
        timeline.error = undefined;
      } else {
        state[id] = {
          state: 'loading',
        };
      }
    },

    setTimelineSuccess(
      state: TimelineState,
      { payload: { id, latest } }: PayloadAction<{ id: string; latest: string }>,
    ) {
      const timeline = state[id];

      if (timeline) {
        timeline.state = 'success';
        timeline.latest = latest;
        timeline.offset = 0;
        timeline.error = undefined;
      } else {
        state[id] = {
          state: 'success',
          latest,
          offset: 0,
        };
      }
    },

    setTimelineError(
      state: TimelineState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      const timeline = state[id];

      if (timeline) {
        timeline.state = 'error';
        timeline.latest = undefined;
        timeline.offset = undefined;
        timeline.error = error;
      } else {
        state[id] = {
          state: 'error',
          error,
        };
      }
    },
    setTimelineOffset(
      state: TimelineState,
      { payload: { id, offset } }: PayloadAction<{ id: string; offset: number }>,
    ) {
      state[id].offset = offset;
    },
  },
});

export const { setTimelineLoading, setTimelineSuccess, setTimelineError, setTimelineOffset } =
  TimelineSlice.actions;

export const useTimeline = (id: string) => useSelector((state: State) => state.timelines[id]);

export const getTimelineImageId = (id: string, date: string) => `${id}_${date}`;

export const getTimelineImageUrl = (template: string, date: string) =>
  `https://wsrv.nl?url=${dayjs(date).format(template)}`;

export const getTimelineLatestDate = async (
  template: string,
  tries: number,
  duration: number,
  unit: ManipulateType,
): Promise<{ data: string; date: string }> => {
  const start = dayjs().startOf(unit);

  for (let count = 0; count < tries; count++) {
    try {
      const date = start.subtract(count * duration, unit).toISOString();
      const response = await fetch(getTimelineImageUrl(template, date));

      if (response.status === 200) {
        const data = URL.createObjectURL(await response.blob());

        return { date, data };
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

    if (timeline && timeline.state !== 'error' && timeline.state !== 'pending') {
      return;
    }

    dispatch(setTimelineLoading({ id }));

    try {
      const { data, date } = await getTimelineLatestDate(template, tries, duration, unit);

      dispatch(setImageSuccess({ id: getTimelineImageId(id, date), data }));
      dispatch(setTimelineSuccess({ id, latest: date }));

      return;
    } catch (error) {
      console.error(error);

      dispatch(setTimelineError({ id, error }));
    }
  };

export const loadTimelineOffset =
  (id: string, template: string, offset: number, duration: number, unit: ManipulateType) =>
  async (dispatch: Dispatch, getState: () => State) => {
    const timeline = getState().timelines[id];

    if (!timeline || timeline.state === 'error' || timeline.state === 'pending') {
      return;
    }

    const date = dayjs(timeline.latest)
      .add(offset * duration, unit)
      .toISOString();

    dispatch(loadImage(getTimelineImageId(id, date), getTimelineImageUrl(template, date)));
    dispatch(setTimelineOffset({ id, offset }));
  };
