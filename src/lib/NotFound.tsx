import { FunctionComponent, SVGAttributes } from 'react';

import './NotFound.scss';
import { cls } from './Utils';

export type NotFoundProps = SVGAttributes<SVGElement> & {
  className?: string;
  title?: string;
};

export const NotFound: FunctionComponent<NotFoundProps> = ({ className, title, ...props }) => (
  <svg
    className={cls('not-found', className)}
    stroke="currentColor"
    fill="transparent"
    strokeWidth="2"
    {...props}
  >
    {title ? <title>{title}</title> : null}
    <svg x="calc(50% - 16px)" y="calc(50% - 16px)">
      <path d="M 1 1 L 31 31 M 31 1 L 1 31" />
    </svg>
  </svg>
);
