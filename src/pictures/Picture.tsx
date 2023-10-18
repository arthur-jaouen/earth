import { FunctionComponent } from 'react';
import { Link } from '../lib/Link';
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
  const style = { aspectRatio: picture.aspectRatio };

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? <NotFound style={style} /> : <Loading style={style} />}
      {blob ? <img src={blob} alt={picture.alt} style={style} /> : null}
      <legend>
        <Link href={picture.url}>Original image</Link> {picture.legend}
      </legend>
    </div>
  );
};

export const RawPicture: FunctionComponent<PictureProps> = ({ picture }) => {
  const { state, url, setLoaded, setError } = useRawPicture(picture);
  const style = { aspectRatio: picture.aspectRatio };

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? <NotFound style={style} /> : <Loading style={style} />}
      {url ? (
        <img src={url} alt={picture.alt} onLoad={setLoaded} onError={setError} style={style} />
      ) : null}
      <legend>
        <Link href={picture.url}>Original image</Link> {picture.legend}
      </legend>
    </div>
  );
};
