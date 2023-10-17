import { FunctionComponent } from 'react';
import { Card, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Sources } from '../sources/SourceTable';
import { Picture, RawPicture } from './Picture';
import { PictureModel } from './PictureModel';

export type PictureCardProps = {
  picture: PictureModel;
};

export const PictureCard: FunctionComponent<PictureCardProps> = ({ picture }) => (
  <Card>
    <CardTitle>{picture.title}</CardTitle>
    <CardSubtitle>
      {picture.subtitle}&nbsp;
      <CardSource name={Sources[picture.source].name} url={Sources[picture.source].url} />
    </CardSubtitle>
    {picture.raw ? <RawPicture picture={picture} /> : <Picture picture={picture} />}
  </Card>
);
