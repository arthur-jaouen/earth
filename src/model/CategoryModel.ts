import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';

export type CategoryModel = {
  name: string;
  Icon: IconType;
};

export type CategoryTable = typeof categories;

export const categories = {
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
