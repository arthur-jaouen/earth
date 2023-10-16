import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi';
import { CategoryModel } from './CategoryModel';

export const Categories = {
  volcanoes: {
    name: 'Volcanoes',
    Icon: GiVolcano,
  } as CategoryModel,
  oceans: {
    name: 'Oceans',
    Icon: GiWaveCrest,
  } as CategoryModel,
  ice: {
    name: 'Ice',
    Icon: GiIceCube,
  } as CategoryModel,
  atmosphere: {
    name: 'Atmosphere',
    Icon: GiWhirlwind,
  } as CategoryModel,
};
