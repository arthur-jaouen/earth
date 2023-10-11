import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';

import './Image.scss';

export type ImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  loader?: (url: string) => Promise<string | null>;
};

export async function loadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    img.onload = () => resolve(url);
    img.onerror = () => reject(new Error());
    img.src = url;
  });
}

export const Image: FunctionComponent<ImageProps> = ({
  url,
  alt,
  width,
  height,
  loader = loadImage,
}) => {
  const [loaded, setLoaded] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const visible = useIsVisible();

  useEffect(() => {
    if (visible) {
      const ref = { canceled: false };

      loader(url)
        .then((url) => {
          if (!ref.canceled) {
            setLoaded(url);
          }
        })
        .catch((err) => console.error(err));

      return () => {
        ref.canceled = true;
      };
    }
  }, [url, loader, visible]);

  const aspectRatio = height && width ? width / height : undefined;

  return (
    <>
      {loading ? <Loading className="image" title={alt} style={{ aspectRatio }} /> : null}
      {loaded ? (
        <img
          className={loading ? 'image overlay' : 'image'}
          src={loaded}
          alt={alt}
          title={alt}
          onLoad={() => setLoading(false)}
          style={{ aspectRatio }}
        />
      ) : loading ? null : (
        <NotFound className="image" title={alt} style={{ aspectRatio }} />
      )}
    </>
  );
};
