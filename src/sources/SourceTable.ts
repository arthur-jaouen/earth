import { Table } from '../lib/Table'
import { SourceModel } from './SourceModel'

export const Sources = new Table(SourceModel)
  .add('crSst', 'Climate Reanalyzer', 'cr', 'https://climatereanalyzer.org/clim/sst_daily/', '')
  .add('crT2', 'Climate Reanalyzer', 'cr', 'https://climatereanalyzer.org/clim/t2_daily/', '')
  .add(
    'kilaueaMonitoring',
    'USGS',
    'usgs',
    'https://www.usgs.gov/volcanoes/kilauea/monitoring-data',
    '',
  )
  .add('nsidcArctic', 'NSIDC', 'nsidc', 'https://nsidc.org/arcticseaicenews/', '')
  .add('nsidcGreenland', 'NSIDC', 'nsidc', 'https://nsidc.org/greenland-today/', '')
  .add(
    'ppArctic',
    'Polar Portal',
    'pp',
    'http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/',
    '',
  )
  .add(
    'ppGreenland',
    'Polar Portal',
    'pp',
    'http://polarportal.dk/en/greenland/surface-conditions/',
    '',
  )
