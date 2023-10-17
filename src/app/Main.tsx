import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { PictureCard } from '../pictures/PictureCard';
import { Pictures } from '../pictures/PictureTable';
import { TimelineCard } from '../timelines/TimelineCard';
import { Timelines } from '../timelines/TimelineTable';

import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {Object.values(Pictures)
        .filter((picture) => !params.category || params.category === picture.category)
        .map((picture) => (
          <PictureCard key={picture.id} picture={picture} />
        ))}
      {Object.values(Timelines)
        .filter((timeline) => !params.category || params.category === timeline.category)
        .map((timeline) => (
          <TimelineCard key={timeline.id} timeline={timeline} />
        ))}
    </main>
  );
};
