import { FunctionComponent, SVGAttributes } from 'react';

import './NotFound.scss';

export type NotFoundProps = SVGAttributes<SVGElement> & {
  className?: string;
  title?: string;
};

export const NotFound: FunctionComponent<NotFoundProps> = ({ className, title, ...props }) => (
  <svg
    className={className ? className + ' not-found' : 'not-found'}
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
