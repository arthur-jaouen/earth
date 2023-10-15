import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import dayjs from 'dayjs';
import { useSelector } from 'react-redux';
import { pictures } from '../data/pictures';
import { addBlob, getBlob } from './Db';
import { Dispatch, State } from './Store';

export type PictureState = {
  state: 'pending' | 'loading' | 'success' | 'error';
  data?: string;
  error?: unknown;
};

export type PictureStates = { [id: string]: PictureState };

const initialState: PictureStates = Object.fromEntries(
  Object.keys(pictures).map((id) => [id, { state: 'pending' }]),
);

export const PictureSlice = createSlice({
  name: 'pictures',
  initialState,
  reducers: {
    setPicturePending(state: PictureStates, { payload: { id } }: PayloadAction<{ id: string }>) {
      state[id] = {
        state: 'pending',
      };
    },

    setPictureLoading(
      state: PictureStates,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'loading',
        data,
      };
    },

    setPictureSuccess(
      state: PictureStates,
      { payload: { id, data } }: PayloadAction<{ id: string; data?: string }>,
    ) {
      state[id] = {
        state: 'success',
        data,
      };
    },

    setPictureError(
      state: PictureStates,
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

export const loadPicture =
  (id: string, url: string, validity: number) =>
  async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const picture = getState().pictures[id];

    if (picture.state !== 'error' && picture.state !== 'pending') {
      return;
    }

    try {
      const cached = await getBlob(id);

      if (cached) {
        const data = URL.createObjectURL(cached.blob);

        if (dayjs(new Date()).isBefore(dayjs(cached.date).add(validity, 'second'))) {
          dispatch(setPictureSuccess({ id, data }));

          return;
        } else {
          dispatch(setPictureLoading({ id, data }));
        }
      } else {
        dispatch(setPictureLoading({ id }));
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

      dispatch(setPictureSuccess({ id, data }));

      setTimeout(async () => {
        await addBlob(id, blob, date);
      });
    } catch (error) {
      console.error(error);

      dispatch(setPictureError({ id, error }));
    }
  };
