import { Table } from '../lib/Table'
import { AuthorModel } from './AuthorModel'

export const Authors = new Table(AuthorModel)
  .add('cr', 'Climate Reanalyzer', '', 'https://climatereanalyzer.org')
  .add('usgs', 'USGS', '', 'https://www.usgs.gov')
  .add('nsidc', 'NSIDC', '', 'https://nsidc.org')
  .add('pp', 'Polar Portal', '', 'http://polarportal.dk')
  .add('vedur', 'Icelandic Met Office', '', 'http://polarportal.dk')
