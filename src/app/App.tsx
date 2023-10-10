import './App.scss';

import { FunctionComponent } from 'react';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { VisibleListener } from '../lib/Visible';
import { Header } from './Header';
import { Main } from './Main';

export const App: FunctionComponent = () => (
  <div className="app">
    <VisibleListener>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/:category" Component={Main} />
        </Routes>
      </HashRouter>
    </VisibleListener>
  </div>
);
