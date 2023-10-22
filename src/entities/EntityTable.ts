import { CategoryTable } from '../categories/CategoryTable'
import { createTable } from '../lib/Table'
import { Pictures } from '../pictures/PictureTable'
import { SourceTable } from '../sources/SourceTable'
import { Timelines } from '../timelines/TimelineTable'
import { EntityModel, EntityType } from './EntityModel'

export type EntityData = {
  id: string
  title: string
  subtitle: string | undefined
  source: keyof SourceTable
  category: keyof CategoryTable
}

export function getEntityData(entity: EntityModel): EntityData {
  switch (entity.type) {
    case EntityType.Picture:
      return Pictures[entity.id]
    case EntityType.Timeline:
      return Timelines[entity.id]
    default:
      throw Error('Invalid entity type')
  }
}

export const Entities = createTable([
  ...Object.values(Pictures).map((e) => new EntityModel(e.id, EntityType.Picture)),
  ...Object.values(Timelines).map((e) => new EntityModel(e.id, EntityType.Timeline)),
])
