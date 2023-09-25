import { FunctionComponent } from 'react';

import './Header.scss';

export const Header: FunctionComponent = () => (
  <header className="header">
    <nav>
      <a className="logo" href="#">
        &#x1F310;&#xFE0E;
      </a>

      <a href="#/volcanoes">&#x1F30B;&#xFE0E; Volcanoes</a>
      <a href="#/oceans">&#x1F30A;&#xFE0E; Oceans</a>
      <a href="#/ice">&#9927;&#xFE0E; Ice</a>
    </nav>

    <div>&#x26A0; ALPHA v0.0.1 - WORK IN PROGRESS &#x26A0;</div>

    <nav>
      <form action="#search" method="GET">
        <input type="text" name="q" placeholder="Search" />
        <input type="submit" value="&#x1F50D;&#xFE0E;" />
      </form>

      <a href="#about">About</a>
    </nav>
  </header>
);
