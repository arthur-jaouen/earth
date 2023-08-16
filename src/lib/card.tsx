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
