import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { PictureCard } from '../lib/Picture';
import { TimelineCard } from '../lib/Timeline';
import { pictures } from '../model/PictureModel';
import { timelines } from '../model/TimelineModel';

import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {Object.entries(pictures)
        .filter(([, picture]) => !params.category || params.category === picture.category)
        .map(([id, picture]) => (
          <PictureCard key={id} id={id} picture={picture} />
        ))}
      {Object.entries(timelines)
        .filter(([, timeline]) => !params.category || params.category === timeline.category)
        .map(([id, timeline]) => (
          <TimelineCard key={id} id={id} timeline={timeline} />
        ))}
    </main>
  );
};
