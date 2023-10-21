import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Timelines } from './TimelineTable'

export type TimelineState = {
  state: 'pending' | 'loading' | 'success' | 'error'
  latest?: string
  offset?: number
  error?: unknown
}

export type TimelineSliceState = { [id: string]: TimelineState }

const initialState: TimelineSliceState = Object.fromEntries(
  Object.keys(Timelines).map((id) => [id, { state: 'pending' }]),
)

export const TimelineSlice = createSlice({
  name: 'timelines',
  initialState,
  reducers: {
    setTimelineLoading(
      state: TimelineSliceState,
      {
        payload: { id, latest, offset },
      }: PayloadAction<{ id: string; latest?: string; offset?: number }>,
    ) {
      state[id] = {
        state: 'loading',
        latest,
        offset,
      }
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
      }
    },

    setTimelineError(
      state: TimelineSliceState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      state[id] = {
        state: 'error',
        error,
      }
    },

    setTimelineOffset(
      state: TimelineSliceState,
      { payload: { id, offset } }: PayloadAction<{ id: string; offset: number }>,
    ) {
      state[id].offset = offset
    },
  },
})

export const { setTimelineLoading, setTimelineSuccess, setTimelineError, setTimelineOffset } =
  TimelineSlice.actions
