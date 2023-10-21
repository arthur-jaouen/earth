import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Pictures } from './PictureTable'

export type PictureState = {
  state: 'pending' | 'loading' | 'success' | 'error'
  blob?: string
  error?: unknown
}

export type PictureSliceState = { [id: string]: PictureState }

const initialState: PictureSliceState = Object.fromEntries(
  Object.keys(Pictures).map((id) => [id, { state: 'pending' }]),
)

function dropBlob(oldBlob?: string, newBlob?: string) {
  if (oldBlob && newBlob && oldBlob !== newBlob) {
    URL.revokeObjectURL(oldBlob)
  }
}

export const PictureSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    setPicturePending(
      state: PictureSliceState,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) {
      dropBlob(state[id]?.blob)

      state[id] = {
        state: 'pending',
      }
    },

    setPictureLoading(
      state: PictureSliceState,
      { payload: { id, blob } }: PayloadAction<{ id: string; blob?: string }>,
    ) {
      dropBlob(state[id]?.blob, blob)

      state[id] = {
        state: 'loading',
        blob: blob,
      }
    },

    setPictureSuccess(
      state: PictureSliceState,
      { payload: { id, blob } }: PayloadAction<{ id: string; blob?: string }>,
    ) {
      dropBlob(state[id]?.blob, blob)

      state[id] = {
        state: 'success',
        blob: blob,
      }
    },

    setPictureError(
      state: PictureSliceState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      dropBlob(state[id]?.blob)

      state[id] = {
        state: 'error',
        error,
      }
    },
  },
})

export const { setPicturePending, setPictureLoading, setPictureSuccess, setPictureError } =
  PictureSlice.actions
