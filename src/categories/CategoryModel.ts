import { IconType } from 'react-icons/lib';
import { Categories } from './Categories';

export type CategoryModel = {
  name: string;
  Icon: IconType;
};

export type CategoryTable = typeof Categories;
