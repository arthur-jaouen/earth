import { Pictures } from '../pictures/PictureTable'
import { Timelines } from '../timelines/TimelineTable'

export enum EntityType {
  Picture,
  Timeline,
}

export type EntityData = {
  id: string
  title: string
  subtitle: string | undefined
  source: string
  category: string
}

export class EntityModel {
  constructor(
    public id: string,
    public type: EntityType,
  ) {}

  get data(): EntityData {
    switch (this.type) {
      case EntityType.Picture:
        return Pictures.get(this.id)
      case EntityType.Timeline:
        return Timelines.get(this.id)
      default:
        throw Error('Invalid entity type')
    }
  }
}
