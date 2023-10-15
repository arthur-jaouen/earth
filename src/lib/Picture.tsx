import { FunctionComponent, HTMLProps, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadPicture,
  setPictureError,
  setPictureLoading,
  setPictureSuccess,
  usePicture,
} from '../store/Pictures';
import { Dispatch } from '../store/Store';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import './Picture.scss';

export type PictureProps = HTMLProps<HTMLImageElement> & {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
  cors?: boolean;
  validity?: number;
};

export const Picture: FunctionComponent<PictureProps> = ({
  id,
  url,
  alt,
  width,
  height,
  legend,
  cors,
  validity = 365 * 24 * 3600,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, data } = usePicture(id);
  const currentSrc = visible ? (cors ? url : data) : undefined;
  const [prevSrc, setPrevSrc] = useState(currentSrc);

  useEffect(() => {
    if (visible && state === 'pending') {
      if (cors) {
        dispatch(setPictureLoading({ id }));
      } else {
        dispatch(loadPicture(id, url, validity));
      }
    }
  }, [dispatch, visible, state, id, url, validity, cors]);

  const onLoad = useCallback(() => dispatch(setPictureSuccess({ id })), [dispatch, id]);
  const onError = useCallback(
    () => dispatch(setPictureError({ id, error: 'Error while loading picture' })),
    [dispatch, id],
  );

  useEffect(() => {
    if (currentSrc) {
      setPrevSrc(currentSrc);
    }
  }, [currentSrc]);

  const src = currentSrc || prevSrc;
  const aspectRatio = height && width ? width / height : undefined;

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? (
        <NotFound style={{ aspectRatio }} />
      ) : (
        <Loading style={{ aspectRatio }} />
      )}
      {src ? (
        <img
          src={src}
          alt={alt}
          onLoad={cors ? onLoad : undefined}
          onError={cors ? onError : undefined}
          style={{ aspectRatio }}
          {...props}
        />
      ) : null}
      {legend ? <legend>{legend}</legend> : null}
    </div>
  );
};
