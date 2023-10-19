import { FunctionComponent } from 'react';
import { Picture } from '../pictures/Picture';
import { Pictures } from '../pictures/PictureTable';
import { Timeline } from '../timelines/Timeline';
import { Timelines } from '../timelines/TimelineTable';
import { EntityModel, EntityType } from './EntityModel';

export type EntityProps = {
  entity: EntityModel;
};

export const Entity: FunctionComponent<EntityProps> = ({ entity }) => {
  switch (entity.type) {
    case EntityType.Picture:
      return <Picture picture={Pictures[entity.id]} />;
    case EntityType.Timeline:
      return <Timeline timeline={Timelines[entity.id]} />;
  }
};
