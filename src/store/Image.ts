import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { images } from '../data/images';
import { Dispatch, State } from './Store';

export type ImageItem = {
  state: 'pending' | 'loading' | 'success' | 'error';
  data?: string;
  error?: unknown;
};

export type ImageState = { [id: string]: ImageItem };

const initialState: ImageState = Object.fromEntries(
  Object.keys(images).map((id) => [id, { state: 'pending' }]),
);

export const ImageSlice = createSlice({
  name: 'images',
  initialState,
  reducers: {
    setImageLoading(
      state: ImageState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      const image = state[id];

      if (image) {
        image.state = 'loading';
        image.data = data;
        image.error = undefined;
      } else {
        state[id] = {
          state: 'loading',
        };
      }
    },

    setImageSuccess(
      state: ImageState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      const image = state[id];

      if (image) {
        image.state = 'success';
        image.data = data;
        image.error = undefined;
      } else {
        state[id] = {
          state: 'success',
          data,
        };
      }
    },

    setImageError(
      state: ImageState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      const image = state[id];

      if (image) {
        image.state = 'error';
        image.data = undefined;
        image.error = error;
      } else {
        state[id] = {
          state: 'error',
          error,
        };
      }
    },
  },
});

export const { setImageLoading, setImageSuccess, setImageError } = ImageSlice.actions;

export const useImage = (id: string) => useSelector((state: State) => state.images[id]);

export const loadImage =
  (id: string, url: string) =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const image = getState().images[id];

    if (image && image.state !== 'error' && image.state !== 'pending') {
      return;
    }

    dispatch(setImageLoading({ id }));

    try {
      const response = await fetch(url);
      const data = URL.createObjectURL(await response.blob());

      dispatch(setImageSuccess({ id, data }));
    } catch (error) {
      console.error(error);

      dispatch(setImageError({ id, error }));
    }
  };
