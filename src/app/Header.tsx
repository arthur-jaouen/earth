import { FunctionComponent } from 'react';
import { BsGlobe } from 'react-icons/bs';
import { FaCircleInfo } from 'react-icons/fa6';
import { Categories } from '../categories/Categories';
import { Menu, MenuLink, MenuSearch } from '../lib/Menu';

import './Header.scss';

export const Header: FunctionComponent = () => (
  <header className="header">
    <Menu>
      <MenuLink className="header-logo" href="#" Icon={BsGlobe} />

      {Object.entries(Categories).map(([key, { Icon, name }]) => (
        <MenuLink key={key} className={'header-' + key} href={'#' + key} Icon={Icon}>
          {name}
        </MenuLink>
      ))}

      <MenuSearch />

      <MenuLink className="header-about" href="#about" Icon={FaCircleInfo}>
        About
      </MenuLink>
    </Menu>
  </header>
);
