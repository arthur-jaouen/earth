import './App.scss';

import { FunctionComponent } from 'react';
import { Card, CardImage, CardLegend, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Image } from '../lib/Image';
import { VisibleListener } from '../lib/Visible';
import { Header } from './Header';
import { Main } from './Main';

import images from '../data/images.json';

export const App: FunctionComponent = () => (
  <div className="app">
    <VisibleListener>
      <Header />
      <Main>
        {images.map((image, i) => (
          <Card key={i}>
            <CardTitle>{image.title}</CardTitle>
            <CardSubtitle>
              {image.subtitle}&nbsp;
              <CardSource name={image.source.name} url={image.source.url} />
            </CardSubtitle>
            <CardImage>
              <Image
                url={image.url}
                alt={image.title}
                width={image.width}
                height={image.height}
                timed={image.timed}
              />
            </CardImage>
            <CardLegend>{image.legend}</CardLegend>
          </Card>
        ))}
      </Main>
    </VisibleListener>
  </div>
);
