export enum EntityType {
  Picture,
  Timeline,
}

export class EntityModel {
  constructor(
    public id: string,
    public type: EntityType,
  ) {}
}
