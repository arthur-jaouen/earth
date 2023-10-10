import { FunctionComponent } from 'react';
import { AiOutlineWarning } from 'react-icons/ai';
import { BsGlobe } from 'react-icons/bs';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { categories } from '../data/categories';

import './Header.scss';

export const Header: FunctionComponent = () => (
  <header className="header">
    <nav>
      <a className="logo" href="#">
        <BsGlobe />
      </a>

      {Object.entries(categories).map(([key, category]) => (
        <a key={key} href={'#' + key}>
          <category.Icon /> {category.name}
        </a>
      ))}
    </nav>

    <div>
      <AiOutlineWarning /> Alpha 1 <AiOutlineWarning />
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
