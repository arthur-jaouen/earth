export class PictureModel {
  constructor(
    public id: string,
    public title: string,
    public subtitle: string | undefined,
    public source: string,
    public category: string,
    public url: string,
    public original: string | undefined,
    public width: number,
    public height: number,
    public legend: string,
    public validity: number,
  ) {}

  get aspectRatio(): number {
    return this.width / this.height
  }
}
