import { CategoryTable } from '../categories/CategoryTable';
import { SourceTable } from '../sources/SourceTable';

export class PictureModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public url: string,
    public alt: string,
    public width: number,
    public height: number,
    public legend: string,
    public validity: number,
    public raw: boolean = false,
  ) {}

  get aspectRatio(): number {
    return this.width / this.height;
  }
}
