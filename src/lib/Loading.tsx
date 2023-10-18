import { FunctionComponent, SVGAttributes } from 'react';

import './Loading.scss';
import { cls } from './Utils';

export type LoadingProps = SVGAttributes<SVGElement>;

export const Loading: FunctionComponent<LoadingProps> = ({ className, ...props }) => (
  <svg
    className={cls('loading', className)}
    stroke="currentColor"
    fill="transparent"
    strokeWidth="2"
    {...props}
  >
    <svg x="calc(50% - 16px)" y="calc(50% - 16px)">
      <path d="M 16 1 A 15 15 0 1 0 31 16" />
    </svg>
  </svg>
);
