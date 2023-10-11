import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { FunctionComponent, useCallback } from 'react';
import { Image } from './Image';

export type TimelineProps = {
  url: string;
  alt: string;
  width?: number;
  height?: number;
  duration?: number;
  unit?: ManipulateType;
  limit?: number;
};

export async function loadImage(url: string, date: Dayjs): Promise<string> {
  const dateUrl = 'https://wsrv.nl?url=' + date.format(url);
  const response = await fetch(dateUrl, { method: 'HEAD' });

  if (response.status !== 200) {
    throw new Error();
  }

  return dateUrl;
}

export async function getLatestImage(
  url: string,
  duration: number,
  unit: ManipulateType,
  limit: number,
): Promise<string | null> {
  let date = dayjs();

  for (let count = 0; count < limit; count++) {
    try {
      return await loadImage(url, date);
    } catch (error) {
      // Nothing, just try next date
    }

    date = date.subtract(duration, unit);
  }

  return null;
}

export const Timeline: FunctionComponent<TimelineProps> = ({
  url,
  alt,
  width,
  height,
  duration = 1,
  unit = 'day',
  limit = 10,
}) => {
  const loader = useCallback(
    (url: string) => getLatestImage(url, duration, unit, limit),
    [duration, unit, limit],
  );

  return <Image url={url} alt={alt} width={width} height={height} loader={loader} />;
};
