import './App.scss';

import { FunctionComponent } from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Routes } from 'react-router-dom';
import { Category } from '../categories/Category';
import { CategoryDetail } from '../categories/CategoryDetail';
import { About } from './About';
import { Header } from './Header';
import { Main } from './Main';
import { Store } from './Store';

export const App: FunctionComponent = () => (
  <div className="app">
    <Provider store={Store}>
      <Header />
      <HashRouter>
        <Routes>
          <Route path="/" Component={Main} />
          <Route path="/about" Component={About} />
          <Route path="/:category" Component={Category} />
          <Route path="/:category/:id" Component={CategoryDetail} />
        </Routes>
      </HashRouter>
    </Provider>
  </div>
);
