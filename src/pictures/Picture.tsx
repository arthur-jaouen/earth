import { FunctionComponent } from 'react';
import { Loading } from '../lib/Loading';
import { NotFound } from '../lib/NotFound';
import { usePicture, useRawPicture } from './PictureLogic';
import { PictureModel } from './PictureModel';

import './Picture.scss';

export type PictureProps = {
  picture: PictureModel;
};

export const Picture: FunctionComponent<PictureProps> = ({ picture }) => {
  const { state, blob } = usePicture(picture);

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? (
        <NotFound style={{ aspectRatio: picture.aspectRatio }} />
      ) : (
        <Loading style={{ aspectRatio: picture.aspectRatio }} />
      )}
      {blob ? (
        <img src={blob} alt={picture.alt} style={{ aspectRatio: picture.aspectRatio }} />
      ) : null}
      <legend>{picture.legend}</legend>
    </div>
  );
};

export const RawPicture: FunctionComponent<PictureProps> = ({ picture }) => {
  const { state, url, setLoaded, setError } = useRawPicture(picture);

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? (
        <NotFound style={{ aspectRatio: picture.aspectRatio }} />
      ) : (
        <Loading style={{ aspectRatio: picture.aspectRatio }} />
      )}
      {url ? (
        <img
          src={url}
          alt={picture.alt}
          onLoad={setLoaded}
          onError={setError}
          style={{ aspectRatio: picture.aspectRatio }}
        />
      ) : null}
      <legend>{picture.legend}</legend>
    </div>
  );
};
