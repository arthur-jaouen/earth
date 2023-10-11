import { FunctionComponent } from 'react';
import { useParams } from 'react-router-dom';
import { images } from '../data/images';
import { sources } from '../data/sources';
import { Card, CardImage, CardLegend, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Image } from '../lib/Image';

import { Timeline } from '../lib/Timeline';
import './Main.scss';

export const Main: FunctionComponent = () => {
  const params = useParams();

  return (
    <main className="main">
      {images
        .filter((image) => !params.category || params.category == image.category)
        .map((image, i) => (
          <Card key={(params.category || '') + i}>
            <CardTitle>{image.title}</CardTitle>
            <CardSubtitle>
              {image.subtitle}&nbsp;
              <CardSource name={sources[image.source].name} url={sources[image.source].url} />
            </CardSubtitle>
            <CardImage>
              {image.timeline ? (
                <Timeline
                  url={image.url}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                  duration={image.duration}
                  unit={image.unit}
                  limit={image.limit}
                />
              ) : (
                <Image
                  url={image.url}
                  alt={image.title}
                  width={image.width}
                  height={image.height}
                />
              )}
            </CardImage>
            <CardLegend>{image.legend}</CardLegend>
          </Card>
        ))}
    </main>
  );
};
