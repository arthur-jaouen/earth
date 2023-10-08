import dayjs, { ManipulateType } from 'dayjs';
import { FunctionComponent, useEffect, useState } from 'react';
import { Loading } from './Loading';
import { NotFound } from './NotFound';

import './Image.scss';
import { useIsVisible } from './Visible';

export type ImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  timed?: boolean;
  duration?: number;
  unit?: ManipulateType;
  limit?: number;
};

export async function loadImage(url: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const img = document.createElement('img');

    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
}

export async function getLatestImage(
  templateUrl: string,
  duration: number,
  unit: ManipulateType,
  limit: number,
): Promise<string | null> {
  let date = dayjs();

  for (let count = 0; count < limit; count++) {
    try {
      return await loadImage(date.format(templateUrl));
    } catch (error) {
      // Nothing, just try next date
    }

    date = date.subtract(duration, unit);
  }

  return null;
}

export const Image: FunctionComponent<ImageProps> = ({
  url,
  alt,
  width,
  height,
  timed = false,
  duration = 1,
  unit = 'day',
  limit = 10,
}) => {
  const [latest, setLatest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const visible = useIsVisible();

  useEffect(() => {
    if (visible) {
      const ref = { cancelled: false };
      const promise = timed ? getLatestImage(url, duration, unit, limit) : loadImage(url);

      promise
        .then((url) => {
          if (!ref.cancelled) {
            setLatest(url);
          }
        })
        .finally(() => {
          if (!ref.cancelled) {
            setLoading(false);
          }
        });

      return () => {
        ref.cancelled = true;
      };
    }
  }, [url, timed, duration, unit, limit, visible]);

  const aspectRatio = height && width ? width / height : undefined;

  return loading ? (
    <Loading className="image" title={alt} style={{ aspectRatio }} />
  ) : latest ? (
    <img className="image" src={latest} alt={alt} title={alt} style={{ aspectRatio }} />
  ) : (
    <NotFound className="image" title={alt} style={{ aspectRatio }} />
  );
};
