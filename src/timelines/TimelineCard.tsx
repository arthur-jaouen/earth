import { FunctionComponent } from 'react';
import { Card, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Sources } from '../sources/SourceTable';
import { Timeline } from './Timeline';
import { TimelineModel } from './TimelineModel';

export type TimelineCardProps = {
  timeline: TimelineModel;
};

export const TimelineCard: FunctionComponent<TimelineCardProps> = ({ timeline }) => (
  <Card>
    <CardTitle>{timeline.title}</CardTitle>
    <CardSubtitle>
      {timeline.subtitle}&nbsp;
      <CardSource name={Sources[timeline.source].name} url={Sources[timeline.source].url} />
    </CardSubtitle>
    <Timeline timeline={timeline} />
  </Card>
);
