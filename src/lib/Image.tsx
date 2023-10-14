import { FunctionComponent, HTMLProps, useEffect, useState } from 'react';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import './Image.scss';

export type ImageProps = HTMLProps<HTMLImageElement> & {
  url: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
};

export const Image: FunctionComponent<ImageProps> = ({
  url,
  alt,
  width,
  height,
  legend,
  ...props
}) => {
  const visible = useIsVisible();
  const [state, setState] = useState<string>(visible ? 'loading' : 'pending');

  useEffect(() => {
    if (visible) {
      setState('loading');
    }
  }, [visible, url]);

  const aspectRatio = height && width ? width / height : undefined;

  return (
    <div className={'image image-' + state}>
      {state === 'loading' || state === 'success' ? (
        <img
          src={url}
          alt={alt}
          onLoad={() => setState('success')}
          onError={() => setState('error')}
          style={{ aspectRatio }}
          {...props}
        />
      ) : null}
      {state === 'pending' || state === 'loading' ? (
        <Loading style={{ aspectRatio }} />
      ) : state === 'error' ? (
        <NotFound style={{ aspectRatio }} />
      ) : null}
      {legend ? <legend>{legend}</legend> : null}
    </div>
  );
};
