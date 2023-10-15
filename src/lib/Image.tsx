import { FunctionComponent, HTMLProps, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadImage,
  setImageError,
  setImageLoading,
  setImageSuccess,
  useImage,
} from '../store/Image';
import { Dispatch } from '../store/Store';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import './Image.scss';

export type ImageProps = HTMLProps<HTMLImageElement> & {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
  cors?: boolean;
  validity?: number;
};

export const Image: FunctionComponent<ImageProps> = ({
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
  const { state, data } = useImage(id);
  const currentSrc = cors ? url : data;
  const [prevSrc, setPrevSrc] = useState(currentSrc);

  useEffect(() => {
    if (visible && state === 'pending') {
      if (cors) {
        dispatch(setImageLoading({ id }));
      } else {
        dispatch(loadImage(id, url, validity));
      }
    }
  }, [dispatch, visible, state, id, url, validity, cors]);

  const onLoad = useCallback(() => dispatch(setImageSuccess({ id })), [dispatch, id]);
  const onError = useCallback(
    () => dispatch(setImageError({ id, error: 'Error while loading image' })),
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
    <div className={'image image-' + state}>
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
