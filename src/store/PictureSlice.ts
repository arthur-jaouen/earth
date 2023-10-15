import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { pictures } from '../model/PictureModel';
import { State } from './Store';

export type PictureState = {
  state: 'pending' | 'loading' | 'success' | 'error';
  data?: string;
  error?: unknown;
};

export type PictureSliceState = { [id: string]: PictureState };

const initialState: PictureSliceState = Object.fromEntries(
  Object.keys(pictures).map((id) => [id, { state: 'pending' }]),
);

export const PictureSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    setPicturePending(
      state: PictureSliceState,
      { payload: { id } }: PayloadAction<{ id: string }>,
    ) {
      state[id] = {
        state: 'pending',
      };
    },

    setPictureLoading(
      state: PictureSliceState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'loading',
        data,
      };
    },

    setPictureSuccess(
      state: PictureSliceState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'success',
        data,
      };
    },

    setPictureError(
      state: PictureSliceState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      state[id] = {
        state: 'error',
        error,
      };
    },
  },
});

export const { setPicturePending, setPictureLoading, setPictureSuccess, setPictureError } =
  PictureSlice.actions;

export const usePicture = (id: string) => useSelector((state: State) => state.pictures[id]);
