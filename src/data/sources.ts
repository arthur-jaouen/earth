export type Sources = typeof sources;

export const sources = {
  crSst: {
    name: 'Climate Reanalyzer',
    url: 'https://climatereanalyzer.org/clim/sst_daily/',
  },
  crT2: {
    name: 'Climate Reanalyzer',
    url: 'https://climatereanalyzer.org/clim/t2_daily/',
  },
  kilaueaMonitoring: {
    name: 'USGS',
    url: 'https://www.usgs.gov/volcanoes/kilauea/monitoring-data',
  },
  nsidcArctic: { name: 'NSIDC', url: 'https://nsidc.org/arcticseaicenews/' },
  nsidcGreenland: { name: 'NSIDC', url: 'https://nsidc.org/greenland-today/' },
  ppArctic: {
    name: 'Polar Portal',
    url: 'http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/',
  },
  ppGreenland: {
    name: 'Polar Portal',
    url: 'http://polarportal.dk/en/greenland/surface-conditions/',
  },
};
