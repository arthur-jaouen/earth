import dayjs, { Dayjs, ManipulateType } from 'dayjs';
import { FunctionComponent, useEffect, useState } from 'react';
import { Image, ImageProps } from './Image';
import { Loading } from './Loading';
import { NotFound } from './NotFound';
import { useIsVisible } from './Visible';
import { usePromise } from './hooks';

import './Timeline.scss';

export type TimelineProps = ImageProps & {
  duration?: number;
  unit?: ManipulateType;
  tries?: number;
};

export function getImageUrl(url: string, date: Dayjs): string {
  return `https://wsrv.nl?url=${date.format(url)}`;
}

export async function getLatestAvailableDate(
  url: string,
  duration: number,
  unit: ManipulateType,
  tries: number,
): Promise<Dayjs | null> {
  let date = dayjs();

  for (let count = 0; count < tries; count++) {
    try {
      const response = await fetch(getImageUrl(url, date), { method: 'HEAD' });

      if (response.status !== 200) {
        throw new Error();
      }

      return date;
    } catch (error) {
      // Nothing, just try next date
    }

    date = date.subtract(duration, unit);
  }

  return null;
}

export const Timeline: FunctionComponent<TimelineProps> = ({
  url,
  width,
  height,
  duration = 1,
  unit = 'day',
  tries = 10,
  ...props
}) => {
  const visible = useIsVisible();
  const { state, data: latest, load } = usePromise<Dayjs | null>();
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    if (visible) {
      return load(getLatestAvailableDate(url, duration, unit, tries));
    }
  }, [load, url, duration, unit, tries, visible]);

  const aspectRatio = height && width ? width / height : undefined;

  return (
    <div className={'timeline timeline-' + state}>
      {state === 'pending' || state === 'loading' ? (
        <Loading style={{ aspectRatio }} />
      ) : state === 'error' ? (
        <NotFound style={{ aspectRatio }} />
      ) : state === 'success' && latest ? (
        <Image
          url={getImageUrl(url, latest.add(offset * duration, unit))}
          width={width}
          height={height}
          {...props}
        />
      ) : null}
      <input
        type="range"
        min={-30}
        max={0}
        value={offset}
        onChange={(event) => setOffset(event.target.valueAsNumber)}
      />
    </div>
  );
};
