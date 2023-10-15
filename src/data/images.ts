import { Categories } from './categories';
import { Sources } from './sources';

export type ImageMeta = {
  title: string;
  subtitle: string;
  source: keyof Sources;
  category: keyof Categories;
  url: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
  cors?: boolean;
};

export type Images = typeof images;

export const images = {
  kilaueaTilt2d: {
    title: 'Kilauea - Tilt past 2 days',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_uwe_tilt_2day.png',
    alt: 'Kilauea - Tilt past 2 days',
    width: 900,
    height: 300,
    legend: 'Electronic tilt at the Kilauea summit area for the past 2 days',
    tries: 10,
  } as ImageMeta,
  kilaueaTilt1w: {
    title: 'Kilauea - Tilt past week',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_week.png',
    alt: 'Kilauea - Tilt past week',
    width: 900,
    height: 300,
    legend: 'Electronic tilt at the Kilauea summit area for the past week',
  } as ImageMeta,
  kilaueaTilt1m: {
    title: 'Kilauea - Tilt past month',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_month.png',
    alt: 'Kilauea - Tilt past month',
    width: 900,
    height: 300,
    legend: 'Electronic tilt at the Kilauea summit area for the past month',
  } as ImageMeta,
  kilaueaTiltSdh1m: {
    title: 'Kilauea - Tilt SDH station past month',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/SDH-TILT-1mo.png',
    alt: 'Kilauea - Tilt SDH station past month',
    width: 900,
    height: 300,
    legend: 'Electronic tilt at the Kilauea summit area for the past 2 days',
  } as ImageMeta,
  kilaueaGps1y: {
    title: 'Kilauea - GPS past year',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_year.png',
    alt: 'Kilauea - GPS past year',
    width: 900,
    height: 300,
    legend: 'GPS signal at the Kilauea summit area for the past year',
  } as ImageMeta,
  kilaueaGps5y: {
    title: 'Kilauea - GPS past 5 years',
    subtitle: 'Summit Area',
    source: 'kilaueaMonitoring',
    category: 'volcanoes',
    url: 'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_5years.png',
    alt: 'Kilauea - GPS past 5 years',
    width: 900,
    height: 300,
    legend: 'GPS signal at the Kilauea summit area for the past 5 years',
  } as ImageMeta,
  nsidcArcticIceCon: {
    title: 'Arctic - Sea ice concentration',
    subtitle: '',
    source: 'nsidcArctic',
    category: 'ice',
    url: 'https://nsidc.org/data/seaice_index/images/daily_images/N_daily_concentration.png',
    alt: 'Arctic - Sea ice concentration',
    width: 420,
    height: 500,
    legend: 'Daily arctic sea ice concentration map',
    cors: true,
  } as ImageMeta,
  nsidcArcticIceTime: {
    title: 'Arctic - Sea ice area timeseries',
    subtitle: '',
    source: 'nsidcArctic',
    category: 'ice',
    url: 'https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
    alt: 'Arctic - Sea ice area timeseries',
    width: 1050,
    height: 840,
    legend: 'Daily arctic sea ice extent timeseries',
    cors: true,
  } as ImageMeta,
  nsidcAntarcticIceCon: {
    title: 'Antarctic - Sea ice concentration',
    subtitle: '',
    source: 'nsidcArctic',
    category: 'ice',
    url: 'https://nsidc.org/data/seaice_index/images/daily_images/S_daily_concentration.png',
    alt: 'Antarctic - Sea ice concentration',
    width: 420,
    height: 500,
    legend: 'Daily arctic sea ice concentration map',
    cors: true,
  } as ImageMeta,
  nsidcAntarcticIceTime: {
    title: 'Antarctic - Sea ice area timeseries',
    subtitle: '',
    source: 'nsidcArctic',
    category: 'ice',
    url: 'https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
    alt: 'Antarctic - Sea ice area timeseries',
    width: 1050,
    height: 840,
    legend: 'Daily arctic sea ice extent timeseries',
    cors: true,
  } as ImageMeta,
  greenlandMeltArea: {
    title: 'Greenland - Melt area',
    subtitle: '',
    source: 'nsidcGreenland',
    category: 'ice',
    url: 'https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
    alt: 'Greenland - Melt area',
    width: 1200,
    height: 1800,
    legend: 'Daily Greenland melt area',
    cors: true,
  } as ImageMeta,
  greenlandMeltDays: {
    title: 'Greenland - Cumulated melt days',
    subtitle: '',
    source: 'nsidcGreenland',
    category: 'ice',
    url: 'https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
    alt: 'Greenland - Cumulated melt days',
    width: 1200,
    height: 1800,
    legend: 'Cumulated melt days of the Greenland ice sheet',
    cors: true,
  } as ImageMeta,
};
