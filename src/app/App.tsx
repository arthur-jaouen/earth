import './App.scss';

import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { VisibleListener } from '../lib/Visible';
import { Store } from '../store/Store';
import { Header } from './Header';
import { Main } from './Main';

export const App: FunctionComponent = () => (
  <div className="app">
    <Provider store={Store}>
      <VisibleListener>
        <Header />
        <HashRouter>
          <Routes>
            <Route path="/" Component={Main} />
            <Route path="/:category/:id?" Component={Main} />
          </Routes>
        </HashRouter>
      </VisibleListener>
    </Provider>
  </div>
);
