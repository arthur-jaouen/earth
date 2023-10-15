export type AuthorModel = {
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
  } as AuthorModel,
  usgs: { name: 'USGS', description: '', website: 'https://www.usgs.gov' } as AuthorModel,
  nsidc: { name: 'NSIDC', description: '', website: 'https://nsidc.org' } as AuthorModel,
  pp: { name: 'Polar Portal', description: '', website: 'http://polarportal.dk' } as AuthorModel,
};
