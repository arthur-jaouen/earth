import { FunctionComponent } from 'react'
import { BsGlobe } from 'react-icons/bs'
import { FaCircleInfo } from 'react-icons/fa6'
import { useCategories } from '../model'
import { Menu, MenuLink, MenuSearch } from '../ui/Menu'
import { CategoryLink } from './categories/CategoryLink'

import './Header.scss'

export const Header: FunctionComponent = () => (
  <header className="header">
    <Menu>
      <MenuLink className="header-logo" href="#/" I={BsGlobe} />

      {useCategories().map((entry) => (
        <CategoryLink key={entry.entity.id} entity={entry.entity} I={entry.component.Icon} />
      ))}

      <MenuSearch />

      <MenuLink className="header-about" href="#/about" I={FaCircleInfo}>
        About
      </MenuLink>
    </Menu>
  </header>
)
