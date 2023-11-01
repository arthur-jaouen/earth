export class Coordinates {
  constructor(
    public lat: number,
    public lon: number,
  ) {}
}

export class Bounds {
  constructor(
    public west: number,
    public north: number,
    public east: number,
    public south: number,
  ) {}
}

export class LocationModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string | undefined,
    public coordinates: Coordinates,
    public bounds: Bounds,
  ) {}
}
