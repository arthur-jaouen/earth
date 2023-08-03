import { FunctionComponent, PropsWithChildren } from 'react';

import './card.scss';

export const Card: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className="card">{children}</div>
);

export const CardTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h4 className="card-title">{children}</h4>
);

export const CardSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h5 className="card-subtitle">{children}</h5>
);

export type CardImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export const CardImage: FunctionComponent<CardImageProps> = ({ url, alt, width, height }) => (
  <img
    className="card-image"
    src={url}
    alt={alt}
    title={`${url} - ${alt}`}
    width={width}
    height={height}
  />
);

export const CardLegend: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <legend className="card-legend">{children}</legend>
);

export type CardSourceProps = {
  url: string;
  name: string;
};

export const CardSource: FunctionComponent<CardSourceProps> = ({ url, name }) => (
  <a className="card-source" href={url} target="_blank" rel="noreferrer">
    (source: {name})
  </a>
);
