import { FunctionComponent, SVGAttributes } from 'react';

import './Loading.scss';

export type LoadingProps = SVGAttributes<SVGElement> & {
  title?: string;
};

export const Loading: FunctionComponent<LoadingProps> = ({ className, title, ...props }) => (
  <svg
    className={className ? className + ' loading' : 'loading'}
    stroke="currentColor"
    fill="transparent"
    strokeWidth="2"
    {...props}
  >
    <title>{title}</title>
    <svg x="calc(50% - 16px)" y="calc(50% - 16px)">
      <path d="M 16 1 A 15 15 0 1 0 31 16" />
    </svg>
  </svg>
);
