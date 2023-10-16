import { SourceModel } from './SourceModel';

export const Sources = {
  crSst: {
    name: 'Climate Reanalyzer',
    author: 'cr',
    url: 'https://climatereanalyzer.org/clim/sst_daily/',
    description: '',
  } as SourceModel,
  crT2: {
    name: 'Climate Reanalyzer',
    author: 'cr',
    url: 'https://climatereanalyzer.org/clim/t2_daily/',
    description: '',
  } as SourceModel,
  kilaueaMonitoring: {
    name: 'USGS',
    author: 'usgs',
    url: 'https://www.usgs.gov/volcanoes/kilauea/monitoring-data',
    description: '',
  } as SourceModel,
  nsidcArctic: {
    name: 'NSIDC',
    author: 'nsidc',
    url: 'https://nsidc.org/arcticseaicenews/',
    description: '',
  } as SourceModel,
  nsidcGreenland: {
    name: 'NSIDC',
    author: 'nsidc',
    url: 'https://nsidc.org/greenland-today/',
    description: '',
  } as SourceModel,
  ppArctic: {
    name: 'Polar Portal',
    author: 'pp',
    url: 'http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/',
    description: '',
  } as SourceModel,
  ppGreenland: {
    name: 'Polar Portal',
    author: 'pp',
    url: 'http://polarportal.dk/en/greenland/surface-conditions/',
    description: '',
  } as SourceModel,
};
