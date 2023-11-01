import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi'
import { Table } from '../lib/Table'
import { CategoryModel } from './CategoryModel'

export const Categories = new Table(CategoryModel)
  .add('volcanoes', 'Volcanoes', GiVolcano)
  .add('oceans', 'Oceans', GiWaveCrest)
  .add('ice', 'Ice', GiIceCube)
  .add('atmosphere', 'Atmosphere', GiWhirlwind)
