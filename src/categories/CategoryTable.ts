import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi';
import { createTable } from '../lib/Table';
import { CategoryModel } from './CategoryModel';

export type CategoryTable = typeof Categories;

export const Categories = createTable([
  new CategoryModel('volcanoes', 'Volcanoes', GiVolcano),
  new CategoryModel('oceans', 'Oceans', GiWaveCrest),
  new CategoryModel('ice', 'Ice', GiIceCube),
  new CategoryModel('atmosphere', 'Atmosphere', GiWhirlwind),
]);
