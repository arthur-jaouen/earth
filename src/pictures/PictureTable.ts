import { createTable } from '../lib/Table';
import { PictureModel } from './PictureModel';

export type PictureTable = typeof Pictures;

export const Pictures = createTable([
  new PictureModel(
    'kilaueaTilt2d',
    'Kilauea - Tilt past 2 days',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_uwe_tilt_2day.png',
    undefined,
    'Kilauea - Tilt past 2 days',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past 2 days',
    600,
  ),
  new PictureModel(
    'kilaueaTilt1w',
    'Kilauea - Tilt past week',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_week.png',
    undefined,
    'Kilauea - Tilt past week',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past week',
    3600,
  ),
  new PictureModel(
    'kilaueaTilt1m',
    'Kilauea - Tilt past month',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_month.png',
    undefined,
    'Kilauea - Tilt past month',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past month',
    4 * 3600,
  ),
  new PictureModel(
    'kilaueaTiltSdh1m',
    'Kilauea - Tilt SDH station past month',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/SDH-TILT-1mo.png',
    undefined,
    'Kilauea - Tilt SDH station past month',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past 2 days',
    4 * 3600,
  ),
  new PictureModel(
    'kilaueaGps1y',
    'Kilauea - GPS past year',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_year.png',
    undefined,
    'Kilauea - GPS past year',
    900,
    300,
    'GPS signal at the Kilauea summit area for the past year',
    24 * 3600,
  ),
  new PictureModel(
    'kilaueaGps5y',
    'Kilauea - GPS past 5 years',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_5years.png',
    undefined,
    'Kilauea - GPS past 5 years',
    900,
    300,
    'GPS signal at the Kilauea summit area for the past 5 years',
    24 * 3600,
  ),
  new PictureModel(
    'nsidcArcticIceTime',
    'Arctic - Sea ice area timeseries',
    undefined,
    'nsidcArctic',
    'ice',
    'https://wsrv.nl?maxage=1d&url=https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
    'https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
    'Arctic - Sea ice area timeseries',
    1050,
    840,
    'Daily arctic sea ice extent timeseries',
    24 * 3600,
  ),
  new PictureModel(
    'nsidcAntarcticIceTime',
    'Antarctic - Sea ice area timeseries',
    undefined,
    'nsidcArctic',
    'ice',
    'https://wsrv.nl?maxage=1d&url=https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
    'https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
    'Antarctic - Sea ice area timeseries',
    1050,
    840,
    'Daily arctic sea ice extent timeseries',
    24 * 3600,
  ),
  new PictureModel(
    'nsidcGreenlandMeltArea',
    'Greenland - Melt area',
    undefined,
    'nsidcGreenland',
    'ice',
    'https://wsrv.nl?maxage=1d&url=https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
    'https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
    'Greenland - Melt area',
    1200,
    1800,
    'Daily Greenland melt area',
    24 * 3600,
  ),
  new PictureModel(
    'nsidcGreenlandMeltDays',
    'Greenland - Cumulated melt days',
    undefined,
    'nsidcGreenland',
    'ice',
    'https://wsrv.nl?maxage=1d&url=https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
    'https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
    'Greenland - Cumulated melt days',
    1200,
    1800,
    'Cumulated melt days of the Greenland ice sheet',
    24 * 3600,
  ),
]);