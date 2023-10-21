import { CategoryTable } from '../categories/CategoryTable';
import { SourceTable } from '../sources/SourceTable';

export class PictureModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string | undefined,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public url: string,
    public original: string | undefined,
    public alt: string,
    public width: number,
    public height: number,
    public legend: string,
    public validity: number,
  ) {}

  get aspectRatio(): number {
    return this.width / this.height;
  }
}
