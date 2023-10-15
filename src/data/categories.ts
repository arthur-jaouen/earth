import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi';
import { IconType } from 'react-icons/lib';

export type CategoryData = {
  name: string;
  Icon: IconType;
};

export type CategoryTable = typeof categories;

export const categories = {
  volcanoes: {
    name: 'Volcanoes',
    Icon: GiVolcano,
  } as CategoryData,
  oceans: {
    name: 'Oceans',
    Icon: GiWaveCrest,
  } as CategoryData,
  ice: {
    name: 'Ice',
    Icon: GiIceCube,
  } as CategoryData,
  atmosphere: {
    name: 'Atmosphere',
    Icon: GiWhirlwind,
  } as CategoryData,
};
