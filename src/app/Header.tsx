import { FunctionComponent } from 'react';
import { AiFillWarning } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { GiIceCube, GiVolcano, GiWaveCrest } from 'react-icons/gi';

import './Header.scss';

export const Header: FunctionComponent = () => (
  <header className="header">
    <nav>
      <a className="logo" href="#">
        <BsGlobe />
      </a>

      <a href="#/volcanoes">
        <GiVolcano /> Volcanoes
      </a>
      <a href="#/oceans">
        <GiWaveCrest /> Oceans
      </a>
      <a href="#/ice">
        <GiIceCube /> Ice
      </a>
    </nav>

    <div>
      <AiFillWarning /> ALPHA v0.0.1 - WORK IN PROGRESS <AiFillWarning />
    </div>

    <nav>
      <form action="" method="GET">
        <input type="text" name="q" placeholder="Search" />
        <button type="submit">
          <FaMagnifyingGlass />
        </button>
      </form>

      <a href="#about">About</a>
    </nav>
  </header>
);
