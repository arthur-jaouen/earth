import { AuthorTable } from '../authors/AuthorTable';

export class SourceModel {
  constructor(
    public id: string,
    public name: string,
    public author: keyof AuthorTable,
    public url: string,
    public description: string,
  ) {}
}
