import dayjs, { ManipulateType } from 'dayjs'
import { PictureModel } from '../pictures/PictureModel'

export class TimelineModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string | undefined,
    public source: string,
    public category: string,
    public template: string,
    public width: number,
    public height: number,
    public legend: string,
    public unit: ManipulateType = 'day',
    public duration: number = 1,
    public tries: number = 10,
  ) {}

  get aspectRatio(): number {
    return this.width / this.height
  }

  getDate(latest: string, offset: number): string {
    return dayjs(latest)
      .add(offset * this.duration, this.unit)
      .toISOString()
  }

  getPictureId(date: string): string {
    return `${this.id}_${date}`
  }

  getPictureOriginalUrl(date: string): string {
    return dayjs(date).format(this.template)
  }

  getPictureUrl(date: string): string {
    return `https://wsrv.nl?url=${this.getPictureOriginalUrl(date)}`
  }

  getPictureModel(date: string): PictureModel {
    return new PictureModel(
      this.getPictureId(date),
      this.title,
      this.subtitle,
      this.source,
      this.category,
      this.getPictureUrl(date),
      this.getPictureOriginalUrl(date),
      this.width,
      this.height,
      this.legend,
      365 * 24 * 3600,
    )
  }
}
