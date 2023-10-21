import { CategoryTable } from '../categories/CategoryTable'
import { SourceTable } from '../sources/SourceTable'

export enum EntityType {
  Picture,
  Timeline,
}

export class EntityModel {
  constructor(
    public id: string,
    public type: EntityType,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public title: string,
    public subtitle?: string,
  ) {}
}
