import { FunctionComponent, SVGAttributes } from 'react';

import './NotFound.scss';
import { cls } from './Utils';

export type NotFoundProps = SVGAttributes<SVGElement> & {
  className?: string;
};

export const NotFound: FunctionComponent<NotFoundProps> = ({ className, ...props }) => (
  <svg
    className={cls('not-found', className)}
    stroke="currentColor"
    fill="transparent"
    strokeWidth="2"
    {...props}
  >
    <svg x="50%" y="50%" transform="translate(-16, -16)">
      <path d="M 1 1 L 31 31 M 31 1 L 1 31" />
    </svg>
  </svg>
);
