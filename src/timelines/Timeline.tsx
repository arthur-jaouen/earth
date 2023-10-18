import { FunctionComponent } from 'react';
import { Loading } from '../lib/Loading';
import { NotFound } from '../lib/NotFound';
import { Range } from '../lib/Range';
import { Picture } from '../pictures/Picture';
import { useTimeline } from './TimelineLogic';
import { TimelineModel } from './TimelineModel';

import './Timeline.scss';

export type TimelineProps = {
  timeline: TimelineModel;
};

export const Timeline: FunctionComponent<TimelineProps> = ({ timeline }) => {
  const { state, picture, offset, changeOffset } = useTimeline(timeline);
  const style = { aspectRatio: picture.aspectRatio };

  return (
    <div className={'timeline timeline-' + state}>
      {state === 'loading' || state === 'pending' ? (
        <Loading style={style} />
      ) : state === 'error' ? (
        <NotFound style={style} />
      ) : state === 'success' ? (
        <Picture picture={picture} />
      ) : null}
      <Range min={-30} max={0} value={offset || 0} onChange={changeOffset} />
    </div>
  );
};
