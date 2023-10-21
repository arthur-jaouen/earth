import { createTable } from '../lib/Table'
import { AuthorModel } from './AuthorModel'

export type AuthorTable = typeof Authors

export const Authors = createTable([
  new AuthorModel('cr', 'Climate Reanalyzer', '', 'https://climatereanalyzer.org'),
  new AuthorModel('usgs', 'USGS', '', 'https://www.usgs.gov'),
  new AuthorModel('nsidc', 'NSIDC', '', 'https://nsidc.org'),
  new AuthorModel('pp', 'Polar Portal', '', 'http://polarportal.dk'),
])
