import { FunctionComponent, useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { PictureModel } from '../model/PictureModel';
import { sources } from '../model/SourceModel';
import {
  setPictureError,
  setPictureLoading,
  setPictureSuccess,
  usePicture,
} from '../store/PictureSlice';
import { Dispatch } from '../store/Store';
import { Card, CardSource, CardSubtitle, CardTitle } from './Card';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import './Picture.scss';

export type PictureProps = {
  id: string;
  picture: PictureModel;
};

export const Picture: FunctionComponent<PictureProps> = ({ id, picture }) => {
  const dispatch = useDispatch<Dispatch>();
  const visible = useIsVisible();
  const { state, data } = usePicture(id);
  const currentSrc = visible ? (picture.cors ? picture.url : data) : undefined;
  const [prevSrc, setPrevSrc] = useState(currentSrc);

  useEffect(() => {
    if (visible && state === 'pending') {
      if (picture.cors) {
        dispatch(setPictureLoading({ id }));
      } else {
        dispatch(picture.loadData(id));
      }
    }
  }, [dispatch, visible, state, id, picture]);

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

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? (
        <NotFound style={{ aspectRatio: picture.aspectRatio }} />
      ) : (
        <Loading style={{ aspectRatio: picture.aspectRatio }} />
      )}
      {src ? (
        <img
          src={src}
          alt={picture.alt}
          onLoad={picture.cors ? onLoad : undefined}
          onError={picture.cors ? onError : undefined}
          style={{ aspectRatio: picture.aspectRatio }}
        />
      ) : null}
      <legend>{picture.legend}</legend>
    </div>
  );
};

export type PictureCardProps = {
  id: string;
  picture: PictureModel;
};

export const PictureCard: FunctionComponent<PictureCardProps> = ({ id, picture }) => (
  <Card>
    <CardTitle>{picture.title}</CardTitle>
    <CardSubtitle>
      {picture.subtitle}&nbsp;
      <CardSource name={sources[picture.source].name} url={sources[picture.source].url} />
    </CardSubtitle>
    <Picture id={id} picture={picture} />
  </Card>
);
