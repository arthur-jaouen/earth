import { AuthorTable } from '../authors/AuthorModel';
import { Sources } from './Sources';

export type SourceModel = {
  name: string;
  author: keyof AuthorTable;
  url: string;
  description: string;
};

export type SourceTable = typeof Sources;
