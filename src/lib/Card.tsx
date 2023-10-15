import { FunctionComponent, PropsWithChildren, useState } from 'react';
import { VisibleProvider } from './Visible';

import './Card.scss';

export const Card: FunctionComponent<PropsWithChildren> = ({ children }) => {
  const [elem, setElem] = useState<HTMLElement | null>(null);

  return (
    <div className="card" ref={setElem}>
      <VisibleProvider elem={elem}>{children}</VisibleProvider>
    </div>
  );
};

export const CardTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h3 className="card-title">{children}</h3>
);

export const CardSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h4 className="card-subtitle">{children}</h4>
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
