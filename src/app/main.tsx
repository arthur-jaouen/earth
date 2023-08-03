import { FunctionComponent, PropsWithChildren } from 'react';

import './main.scss';

export const Main: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <main className="main">{children}</main>
);
