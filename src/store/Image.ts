import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { images } from '../data/images';
import { addBlob, getBlob } from './Db';
import { Dispatch, State } from './Store';

export type ImageItem = {
  state: 'pending' | 'caching' | 'loading' | 'success' | 'error';
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
    setImagePending(state: ImageState, { payload: { id } }: PayloadAction<{ id: string }>) {
      state[id] = {
        state: 'pending',
      };
    },

    setImageCaching(state: ImageState, { payload: { id } }: PayloadAction<{ id: string }>) {
      state[id] = {
        state: 'caching',
      };
    },

    setImageLoading(
      state: ImageState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'loading',
        data,
      };
    },

    setImageSuccess(
      state: ImageState,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'success',
        data,
      };
    },

    setImageError(
      state: ImageState,
      { payload: { id, error } }: PayloadAction<{ id: string; error: unknown }>,
    ) {
      state[id] = {
        state: 'error',
        error,
      };
    },
  },
});

export const { setImagePending, setImageCaching, setImageLoading, setImageSuccess, setImageError } =
  ImageSlice.actions;

export const useImage = (id: string) => useSelector((state: State) => state.images[id]);

export const loadImage =
  (id: string, url: string, validity: number) =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const image = getState().images[id];

    if (image.state !== 'error' && image.state !== 'pending') {
      return;
    }

    dispatch(setImageCaching({ id }));

    try {
      const cached = await getBlob(id);

      if (cached) {
        const data = URL.createObjectURL(cached.blob);

        if (dayjs().isBefore(dayjs(cached.date).add(validity, 'second'))) {
          dispatch(setImageSuccess({ id, data }));

          return;
        } else {
          dispatch(setImageLoading({ id, data }));
        }
      } else {
        dispatch(setImageLoading({ id }));
      }
    } catch (error) {
      console.error(error);
    }

    try {
      const response = await fetch(url);
      // TODO const date = new Date(response.headers.get('Date') as string);
      const date = new Date();
      const blob = await response.blob();
      const data = URL.createObjectURL(blob);

      dispatch(setImageSuccess({ id, data }));

      setTimeout(async () => {
        await addBlob(id, blob, date);
      });
    } catch (error) {
      console.error(error);

      dispatch(setImageError({ id, error }));
    }
  };
