import { createTable } from '../lib/Table';
import { Pictures } from '../pictures/PictureTable';
import { Timelines } from '../timelines/TimelineTable';
import { EntityModel, EntityType } from './EntityModel';

export const Entities = createTable([
  ...Object.values(Pictures).map(
    (e) => new EntityModel(e.id, EntityType.Picture, e.source, e.category, e.title, e.subtitle),
  ),
  ...Object.values(Timelines).map(
    (e) => new EntityModel(e.id, EntityType.Timeline, e.source, e.category, e.title, e.subtitle),
  ),
]);
