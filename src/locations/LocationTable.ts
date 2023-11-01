import { Table } from '../lib/Table'
import { Bounds, Coordinates, LocationModel } from './LocationModel'

export const LocationTable = new Table(LocationModel)
  .add('earth', 'Earth', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0))
  .add('arctic', 'Arctic', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0))
  .add('antarctic', 'Antarctic', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0))
  .add('greenland', 'Greenland', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0))
  .add('kilauea', 'Kilauea', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0))
