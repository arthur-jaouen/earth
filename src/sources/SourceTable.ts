import { createTable } from '../lib/Table'
import { SourceModel } from './SourceModel'

export type SourceTable = typeof Sources

export const Sources = createTable([
  new SourceModel(
    'crSst',
    'Climate Reanalyzer',
    'cr',
    'https://climatereanalyzer.org/clim/sst_daily/',
    '',
  ),
  new SourceModel(
    'crT2',
    'Climate Reanalyzer',
    'cr',
    'https://climatereanalyzer.org/clim/t2_daily/',
    '',
  ),
  new SourceModel(
    'kilaueaMonitoring',
    'USGS',
    'usgs',
    'https://www.usgs.gov/volcanoes/kilauea/monitoring-data',
    '',
  ),
  new SourceModel('nsidcArctic', 'NSIDC', 'nsidc', 'https://nsidc.org/arcticseaicenews/', ''),
  new SourceModel('nsidcGreenland', 'NSIDC', 'nsidc', 'https://nsidc.org/greenland-today/', ''),
  new SourceModel(
    'ppArctic',
    'Polar Portal',
    'pp',
    'http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/',
    '',
  ),
  new SourceModel(
    'ppGreenland',
    'Polar Portal',
    'pp',
    'http://polarportal.dk/en/greenland/surface-conditions/',
    '',
  ),
])
