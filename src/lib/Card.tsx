import { FunctionComponent, PropsWithChildren } from 'react';

import './Card.scss';

export const Card: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <div className="card">{children}</div>
);

export const CardTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h3 className="card-title">{children}</h3>
);

export const CardSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h4 className="card-subtitle">{children}</h4>
);
