import { FunctionComponent } from 'react';

import './image.scss';

export type ImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export const Image: FunctionComponent<ImageProps> = ({ url, alt, width, height }) => {
  return (
    <img
      className="image"
      src={url}
      alt={alt}
      title={`${url} - ${alt}`}
      width={width}
      height={height}
    />
  );
};
