import { Authors } from './Authors';

export type AuthorModel = {
  name: string;
  description: string;
  website: string;
};

export type AuthorTable = typeof Authors;
