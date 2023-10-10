import dayjs, { ManipulateType } from 'dayjs';
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
  timed?: boolean;
  duration?: number;
  unit?: ManipulateType;
  limit?: number;
};

export async function loadImage(url: string): Promise<string> {
  const response = await fetch('https://wsrv.nl?url=' + url, { method: 'HEAD' });

  if (response.status !== 200) {
    throw new Error();
  }

  return 'https://wsrv.nl?url=' + url;
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

      promise.then((url) => {
        if (!ref.cancelled) {
          setLatest(url);
        }
      });

      return () => {
        ref.cancelled = true;
      };
    }
  }, [url, timed, duration, unit, limit, visible]);

  const aspectRatio = height && width ? width / height : undefined;

  return (
    <>
      {loading ? <Loading className="image" title={alt} style={{ aspectRatio }} /> : null}
      {latest ? (
        <img
          className={loading ? 'image overlay' : 'image'}
          src={latest}
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
