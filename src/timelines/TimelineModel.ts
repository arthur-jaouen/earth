import dayjs, { ManipulateType } from 'dayjs';
import { CategoryTable } from '../categories/CategoryTable';
import { PictureModel } from '../pictures/PictureModel';
import { SourceTable } from '../sources/SourceTable';

export class TimelineModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public template: string,
    public alt: string,
    public width: number,
    public height: number,
    public legend: string,
    public tries: number = 10,
    public duration: number = 1,
    public unit: ManipulateType = 'day',
  ) {}

  get aspectRatio(): number {
    return this.width / this.height;
  }

  getPictureId(date: string): string {
    return `${this.id}_${date}`;
  }

  getPictureUrl(date: string): string {
    const url = dayjs(date).format(this.template);

    return `https://wsrv.nl?url=${url}`;
  }

  getPictureModel(date: string): PictureModel {
    return new PictureModel(
      this.getPictureId(date),
      this.title,
      this.subtitle,
      this.source,
      this.category,
      this.getPictureUrl(date),
      this.alt,
      this.width,
      this.height,
      this.legend,
      365 * 24 * 3600,
    );
  }
}
