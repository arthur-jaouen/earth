import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { PictureCard } from '../pictures/Picture';
import { Pictures } from '../pictures/Pictures';
import { TimelineCard } from '../timelines/Timeline';
import { Timelines } from '../timelines/Timelines';

import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {Object.entries(Pictures)
        .filter(([, picture]) => !params.category || params.category === picture.category)
        .map(([id, picture]) => (
          <PictureCard key={id} id={id} picture={picture} />
        ))}
      {Object.entries(Timelines)
        .filter(([, timeline]) => !params.category || params.category === timeline.category)
        .map(([id, timeline]) => (
          <TimelineCard key={id} id={id} timeline={timeline} />
        ))}
    </main>
  );
};
