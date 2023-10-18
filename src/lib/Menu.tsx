import { AnchorHTMLAttributes, FunctionComponent, PropsWithChildren } from 'react';
import { FaMagnifyingGlass } from 'react-icons/fa6';
import { IconType } from 'react-icons/lib';
import { Icon } from './Icon';
import { Link } from './Link';
import { cls } from './Utils';

import './Menu.scss';

export type MenuProps = PropsWithChildren;

export const Menu: FunctionComponent<MenuProps> = ({ children }) => (
  <nav className="menu">{children}</nav>
);

export type MenuLinkProps = PropsWithChildren<
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    I?: IconType;
  }
>;

export const MenuLink: FunctionComponent<MenuLinkProps> = ({
  I,
  className,
  children,
  ...props
}) => (
  <Link className={cls('menu-link', className)} {...props}>
    {I ? <Icon I={I} /> : null}
    {children ? <span className="menu-link-item">{children}</span> : null}
  </Link>
);

export const MenuSearch: FunctionComponent = () => (
  <form className="menu-search" action="#search" method="GET">
    <input type="text" name="q" placeholder="Search" />
    <button type="submit">
      <Icon I={FaMagnifyingGlass} />
    </button>
  </form>
);
