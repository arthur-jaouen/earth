import { FunctionComponent, PropsWithChildren } from 'react';

import './Main.scss';

export const Main: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <main className="main">{children}</main>
);
