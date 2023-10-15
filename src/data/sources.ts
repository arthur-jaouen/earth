import { AuthorTable } from './authors';

export type SourceData = {
  name: string;
  author: keyof AuthorTable;
  url: string;
  description: string;
};

export type SourceTable = typeof sources;

export const sources = {
  crSst: {
    name: 'Climate Reanalyzer',
    author: 'cr',
    url: 'https://climatereanalyzer.org/clim/sst_daily/',
    description: '',
  } as SourceData,
  crT2: {
    name: 'Climate Reanalyzer',
    author: 'cr',
    url: 'https://climatereanalyzer.org/clim/t2_daily/',
    description: '',
  } as SourceData,
  kilaueaMonitoring: {
    name: 'USGS',
    author: 'usgs',
    url: 'https://www.usgs.gov/volcanoes/kilauea/monitoring-data',
    description: '',
  } as SourceData,
  nsidcArctic: {
    name: 'NSIDC',
    author: 'nsidc',
    url: 'https://nsidc.org/arcticseaicenews/',
    description: '',
  } as SourceData,
  nsidcGreenland: {
    name: 'NSIDC',
    author: 'nsidc',
    url: 'https://nsidc.org/greenland-today/',
    description: '',
  } as SourceData,
  ppArctic: {
    name: 'Polar Portal',
    author: 'pp',
    url: 'http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/',
    description: '',
  } as SourceData,
  ppGreenland: {
    name: 'Polar Portal',
    author: 'pp',
    url: 'http://polarportal.dk/en/greenland/surface-conditions/',
    description: '',
  } as SourceData,
};
