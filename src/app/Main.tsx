import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { pictures } from '../data/pictures';
import { sources } from '../data/sources';
import { timelines } from '../data/timelines';
import { Card, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Picture } from '../lib/Picture';
import { Timeline } from '../lib/Timeline';

import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {Object.entries(pictures)
        .filter(([, picture]) => !params.category || params.category === picture.category)
        .map(([id, picture]) => (
          <Card key={id}>
            <CardTitle>{picture.title}</CardTitle>
            <CardSubtitle>
              {picture.subtitle}&nbsp;
              <CardSource name={sources[picture.source].name} url={sources[picture.source].url} />
            </CardSubtitle>
            <Picture
              id={id}
              url={picture.url}
              alt={picture.title}
              width={picture.width}
              height={picture.height}
              legend={picture.legend}
              cors={picture.cors}
            />
          </Card>
        ))}
      {Object.entries(timelines)
        .filter(([, timeline]) => !params.category || params.category === timeline.category)
        .map(([id, timeline]) => (
          <Card key={id}>
            <CardTitle>{timeline.title}</CardTitle>
            <CardSubtitle>
              {timeline.subtitle}&nbsp;
              <CardSource name={sources[timeline.source].name} url={sources[timeline.source].url} />
            </CardSubtitle>
            <Timeline
              id={id}
              template={timeline.template}
              alt={timeline.title}
              width={timeline.width}
              height={timeline.height}
              legend={timeline.legend}
            />
          </Card>
        ))}
    </main>
  );
};
