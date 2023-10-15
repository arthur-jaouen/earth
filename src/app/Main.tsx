import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { images } from '../data/images';
import { sources } from '../data/sources';
import { Card, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Image } from '../lib/Image';

import { timelines } from '../data/timelines';
import { Timeline } from '../lib/Timeline';
import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {Object.entries(images)
        .filter(([, image]) => !params.category || params.category === image.category)
        .map(([id, image]) => (
          <Card key={id}>
            <CardTitle>{image.title}</CardTitle>
            <CardSubtitle>
              {image.subtitle}&nbsp;
              <CardSource name={sources[image.source].name} url={sources[image.source].url} />
            </CardSubtitle>
            <Image
              id={id}
              url={image.url}
              alt={image.title}
              width={image.width}
              height={image.height}
              legend={image.legend}
              cors={image.cors}
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
