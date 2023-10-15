export type AuthorData = {
  name: string;
  description: string;
  website: string;
};

export type AuthorTable = typeof authors;

export const authors = {
  cr: {
    name: 'Climate Reanalyzer',
    description: '',
    website: 'https://climatereanalyzer.org',
  } as AuthorData,
  usgs: { name: 'USGS', description: '', website: 'https://www.usgs.gov' } as AuthorData,
  nsidc: { name: 'NSIDC', description: '', website: 'https://nsidc.org' } as AuthorData,
  pp: { name: 'Polar Portal', description: '', website: 'http://polarportal.dk' } as AuthorData,
};
