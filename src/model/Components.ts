import dayjs, { ManipulateType } from 'dayjs'
import { IconType } from 'react-icons/lib'
import { Entity } from '../lib'

export class Author {}

export class AuthorItem {
  constructor(public readonly authorEntity: Entity) {}
}

export class Bounds {
  constructor(
    public readonly west: number,
    public readonly north: number,
    public readonly east: number,
    public readonly south: number,
  ) {}
}

export class Category {
  constructor(public readonly Icon: IconType) {}
}

export class CategoryChild {
  constructor(public readonly categoryEntity: Entity) {}
}

export class Coords {
  constructor(
    public readonly lat: number,
    public readonly lon: number,
  ) {}
}

export class Dim {
  constructor(
    public readonly width: number,
    public readonly height: number,
  ) {}

  get ratio(): number {
    return this.width / this.height
  }
}

export class Err {
  constructor(public readonly error?: unknown) {}
}

export class Init {}

export class Legend {
  constructor(public readonly legend: string) {}
}

export class Loading {}

export class Location {}

export class LocationItem {
  constructor(public readonly locationEntity: Entity) {}
}

export class Media {
  constructor(
    public readonly name: string,
    public readonly description: string | undefined = undefined,
  ) {}
}

export class Picture {
  constructor(
    public readonly url: string,
    public readonly validity: number,
    public readonly original: string = url,
  ) {}
}

export class BlobUrl {
  constructor(public readonly blob: string) {}
}

export class Source {}

export class SourceItem {
  constructor(public readonly sourceEntity: Entity) {}
}

export class Success {}

export class Tag {
  constructor(public readonly tag: string) {}
}

export class Timeline {
  constructor(
    public readonly template: string,
    public readonly unit: ManipulateType = 'day',
    public readonly duration: number = 1,
    public readonly tries: number = 10,
  ) {}

  getDate(latest: Date, offset: number): Date {
    return dayjs(latest)
      .add(offset * this.duration, this.unit)
      .toDate()
  }

  getPictureOriginalUrl(date: Date): string {
    return dayjs(date).format(this.template)
  }

  getPictureUrl(date: Date): string {
    return `https://wsrv.nl?url=${this.getPictureOriginalUrl(date)}`
  }
}

export class TimelinePicture {
  constructor(
    public readonly timelineEntity: Entity,
    public readonly date: Date,
  ) {}
}

export class TimelineState {
  constructor(
    public readonly pictureEntity: Entity,
    public readonly latest: Date,
    public readonly offset: number = 0,
  ) {}
}

export class Url {
  constructor(public readonly url: string) {}
}
