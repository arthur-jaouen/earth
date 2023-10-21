import dayjs from 'dayjs';
import { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addBlob, getBlob } from '../app/Db';
import { Dispatch, State } from '../app/Store';
import { useIsVisible } from '../lib/Visible';
import { PictureModel } from './PictureModel';
import {
  PictureState,
  setPictureError,
  setPictureLoading,
  setPictureSuccess,
} from './PictureSlice';

export function usePicture(picture: PictureModel): PictureState {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, blob } = useSelector((state: State) => state.pictures[picture.id]);
  const currentBlob = visible ? blob : undefined;
  const [prevBlob, setPrevSrc] = useState(currentBlob);

  useEffect(() => {
    if (visible && state === 'pending') {
      dispatch(loadPicture(picture));
    }
  }, [dispatch, visible, state, picture]);

  useEffect(() => {
    if (currentBlob) {
      setPrevSrc(currentBlob);
    }
  }, [currentBlob]);

  return { state, blob: currentBlob || prevBlob };
}

export function useRawPicture(
  picture: PictureModel,
): Omit<PictureState, 'url'> & { url?: string; setLoaded: () => void; setError: () => void } {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const pictureState = useSelector((state: State) => state.pictures[picture.id]);
  const currentUrl = visible ? picture.url : undefined;
  const [prevUrl, setPrevSrc] = useState(currentUrl);

  useEffect(() => {
    if (visible && pictureState.state === 'pending') {
      dispatch(setPictureLoading({ id: picture.id }));
    }
  }, [dispatch, visible, pictureState.state, picture.id]);

  useEffect(() => {
    if (currentUrl) {
      setPrevSrc(currentUrl);
    }
  }, [currentUrl]);

  const setLoaded = useCallback(
    () => dispatch(setPictureSuccess({ id: picture.id })),
    [dispatch, picture.id],
  );

  const setError = useCallback(
    () => dispatch(setPictureError({ id: picture.id, error: 'Error while loading picture' })),
    [dispatch, picture.id],
  );

  const url = currentUrl || prevUrl;

  return { ...pictureState, url, setLoaded, setError };
}

export function loadCachedPicture(picture: PictureModel) {
  return async (dispatch: Dispatch): Promise<boolean> => {
    const cached = await getBlob(picture.id);

    if (!cached) {
      dispatch(setPictureLoading({ id: picture.id }));

      return true;
    }

    const blob = URL.createObjectURL(cached.blob);
    const isValid = dayjs(new Date()).isBefore(dayjs(cached.date).add(picture.validity, 'second'));

    if (!isValid) {
      dispatch(setPictureLoading({ id: picture.id, blob }));

      return true;
    }

    dispatch(setPictureSuccess({ id: picture.id, blob }));

    return false;
  };
}

export function loadPicture(picture: PictureModel) {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      const needsLoad = await dispatch(loadCachedPicture(picture));

      if (needsLoad) {
        const response = await fetch(picture.url);
        // TODO const date = new Date(response.headers.get('Date') as string);
        const date = new Date();
        const blob = await response.blob();

        dispatch(setPictureSuccess({ id: picture.id, blob: URL.createObjectURL(blob) }));

        setTimeout(async () => {
          await addBlob(picture.id, blob, date);
        });
      }
    } catch (error) {
      console.error(error);

      dispatch(setPictureError({ id: picture.id, error }));
    }
  };
}
