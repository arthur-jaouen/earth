import { FunctionComponent, PropsWithChildren } from 'react';
import { IconType } from 'react-icons/lib';

import './Icon.scss';

export type IProps = PropsWithChildren<{ Icon: IconType }>;

export const I: FunctionComponent<IProps> = ({ Icon }) => (
  <span className="icon">
    <Icon />
  </span>
);
