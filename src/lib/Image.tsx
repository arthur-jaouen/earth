import { FunctionComponent, HTMLProps, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import {
  loadImage,
  setImageError,
  setImageLoading,
  setImageSuccess,
  useImage,
} from '../store/Image';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import { Dispatch } from '../store/Store';
import './Image.scss';

export type ImageProps = HTMLProps<HTMLImageElement> & {
  id: string;
  url: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
  cors?: boolean;
};

export const Image: FunctionComponent<ImageProps> = ({
  id,
  url,
  alt,
  width,
  height,
  legend,
  cors,
  ...props
}) => {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, data } = useImage(id);

  useEffect(() => {
    if (visible && state === 'pending') {
      if (cors) {
        dispatch(setImageLoading({ id, data: url }));
      } else {
        dispatch(loadImage(id, url));
      }
    }
  }, [dispatch, visible, state, id, url, cors]);

  const aspectRatio = height && width ? width / height : undefined;

  const onLoad = useCallback(() => dispatch(setImageSuccess({ id, data })), [dispatch, id, data]);
  const onError = useCallback(
    () => dispatch(setImageError({ id, error: 'Error while loading image' })),
    [dispatch, id],
  );

  return (
    <div className={'image image-' + state}>
      {state === 'loading' || state === 'success' ? (
        <img
          src={data}
          alt={alt}
          onLoad={state === 'loading' && data ? onLoad : undefined}
          onError={state === 'loading' && data ? onError : undefined}
          style={{ aspectRatio }}
          {...props}
        />
      ) : null}
      {state === 'pending' || state === 'loading' ? (
        <Loading style={{ aspectRatio }} />
      ) : state === 'error' ? (
        <NotFound style={{ aspectRatio }} />
      ) : null}
      {legend ? <legend>{legend}</legend> : null}
    </div>
  );
};
