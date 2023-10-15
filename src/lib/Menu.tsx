import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';
import { IconType } from 'react-icons/lib';
import { I } from './Icon';

import { FaMagnifyingGlass } from 'react-icons/fa6';
import './Menu.scss';

export type MenuProps = PropsWithChildren;

export const Menu: FunctionComponent<MenuProps> = ({ children }) => (
  <nav className="menu">{children}</nav>
);

export type MenuLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    Icon?: IconType;
  }
>;

export const MenuLink: FunctionComponent<MenuLinkProps> = ({
  Icon,
  className,
  children,
  ...props
}) => (
  <a className={className ? `menu-link ${className}` : 'menu-link'} {...props}>
    {Icon ? <I Icon={Icon} /> : null}
    {children ? <span className="menu-link-item">{children}</span> : null}
  </a>
);

export const MenuSearch: FunctionComponent = () => (
  <form className="menu-search" action="#search" method="GET">
    <input type="text" name="q" placeholder="Search" />
    <button type="submit" className="menu-link">
      <I Icon={FaMagnifyingGlass} />
    </button>
  </form>
);
