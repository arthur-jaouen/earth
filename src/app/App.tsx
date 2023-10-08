import './App.scss';

import { FunctionComponent } from 'react';
import { VisibleListener } from '../lib/Visible';
import { Header } from './Header';
import { Main } from './Main';

export const App: FunctionComponent = () => (
  <div className="app">
    <VisibleListener>
      <Header />
      <Main />
    </VisibleListener>
  </div>
);
