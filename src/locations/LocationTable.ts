import { createTable } from '../lib/Table'
import { Bounds, Coordinates, LocationModel } from './LocationModel'

export type LocationTable = typeof Locations

export const Locations = createTable([
  new LocationModel('earth', 'Earth', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0)),
  new LocationModel('arctic', 'Arctic', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0)),
  new LocationModel(
    'antarctic',
    'Antarctic',
    undefined,
    new Coordinates(0, 0),
    new Bounds(0, 0, 0, 0),
  ),
  new LocationModel(
    'greenland',
    'Greenland',
    undefined,
    new Coordinates(0, 0),
    new Bounds(0, 0, 0, 0),
  ),
  new LocationModel('kilauea', 'Kilauea', undefined, new Coordinates(0, 0), new Bounds(0, 0, 0, 0)),
])
