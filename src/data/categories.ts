import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi';

export type Categories = typeof categories;

export const categories = {
  volcanoes: {
    name: 'Volcanoes',
    Icon: GiVolcano,
  },
  oceans: {
    name: 'Oceans',
    Icon: GiWaveCrest,
  },
  ice: {
    name: 'Ice',
    Icon: GiIceCube,
  },
  atmosphere: {
    name: 'Atmosphere',
    Icon: GiWhirlwind,
  },
};
