import { FunctionComponent } from 'react';
import { Link } from '../lib/Link';
import { Loading } from '../lib/Loading';
import { NotFound } from '../lib/NotFound';
import { usePicture } from './PictureLogic';
import { PictureModel } from './PictureModel';

import './Picture.scss';

export type PictureProps = {
  picture: PictureModel;
};

export const Picture: FunctionComponent<PictureProps> = ({ picture }) => {
  const { state, blob } = usePicture(picture);

  return <RawPicture picture={picture} state={state} url={blob} />;
};

export type RawPictureProps = {
  picture: PictureModel;
  state: string;
  url?: string;
};

export const RawPicture: FunctionComponent<RawPictureProps> = ({ picture, state, url }) => {
  const style = { aspectRatio: picture.aspectRatio };

  return (
    <div className={'picture picture-' + state}>
      {state === 'error' ? <NotFound style={style} /> : <Loading style={style} />}
      {url ? (
        <svg style={style} className="picture-image">
          <image href={url} width="100%" height="100%" />
        </svg>
      ) : null}
      <legend>
        <Link href={picture.url}>Original image</Link> {picture.legend}
      </legend>
    </div>
  );
};
