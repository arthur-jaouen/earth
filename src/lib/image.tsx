import dayjs from 'dayjs';
import { FunctionComponent, useEffect, useState } from 'react';

import './image.scss';

export type ImageProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
};

export const Image: FunctionComponent<ImageProps> = ({ url, alt, width, height }) => (
  <img className="image" src={url} alt={alt} title={`${url} - ${alt}`} style={{ aspectRatio: width / height }} />
);

export async function getLatestImage(templateUrl: string): Promise<string | null> {
  let date = dayjs();

  for (let count = 0; count < 10; count++) {
    try {
      const url = date.format(templateUrl);
      const response = await fetch(url, { method: 'HEAD' });

      if (response.ok) {
        return url;
      }
    } catch (error) {
      // Nothing, just try next date
    }

    date = date.subtract(1, 'day');
  }

  return null;
}

export const TimeDependentImage: FunctionComponent<ImageProps> = ({ url, alt, width, height }) => {
  const [latest, setLatest] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLatestImage(url)
      .then((latest) => {
        setLatest(latest);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [url]);

  return loading ? (
    <div className="loader" />
  ) : latest ? (
    <Image url={latest} alt={alt} width={width} height={height} />
  ) : (
    <div className="placeholder">No recent image found</div>
  );
};
