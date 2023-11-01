import { Table } from '../lib/Table'
import { Pictures } from '../pictures/PictureTable'
import { Timelines } from '../timelines/TimelineTable'
import { EntityModel, EntityType } from './EntityModel'

export const Entities = new Table(EntityModel)

Pictures.values().forEach((e) => Entities.add(e.id, EntityType.Picture))
Timelines.values().forEach((e) => Entities.add(e.id, EntityType.Timeline))
