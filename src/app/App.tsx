import './App.scss'

import { FunctionComponent } from 'react'
import { HashRouter, Route, Routes } from 'react-router-dom'
import { About } from './About'
import { Header } from './Header'
import { Main } from './Main'
import { CategoryDetail } from './categories/CategoryDetail'
import { CategoryItem } from './categories/CategoryItem'

export const App: FunctionComponent = () => (
  <HashRouter>
    <Header />
    <Routes>
      <Route path="/" Component={Main} />
      <Route path="/about" Component={About} />
      <Route path="/:category" Component={CategoryItem} />
      <Route path="/:category/:id" Component={CategoryDetail} />
    </Routes>
  </HashRouter>
)
