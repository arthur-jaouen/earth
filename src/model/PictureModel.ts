import { CategoryTable } from './CategoryModel';
import { SourceTable } from './SourceModel';

export class PictureModel {
  constructor(
    public title: string,
    public subtitle: string,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public url: string,
    public alt: string,
    public width: number,
    public height: number,
    public legend: string,
    public validity: number,
    public cors: boolean = false,
  ) {}

  get aspectRatio(): number {
    return this.width / this.height;
  }
}

export type PictureTable = typeof pictures;

export const pictures = {
  kilaueaTilt2d: new PictureModel(
    'Kilauea - Tilt past 2 days',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_uwe_tilt_2day.png',
    'Kilauea - Tilt past 2 days',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past 2 days',
    600,
  ),
  kilaueaTilt1w: new PictureModel(
    'Kilauea - Tilt past week',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_week.png',
    'Kilauea - Tilt past week',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past week',
    3600,
  ),
  kilaueaTilt1m: new PictureModel(
    'Kilauea - Tilt past month',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_month.png',
    'Kilauea - Tilt past month',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past month',
    4 * 3600,
  ),
  kilaueaTiltSdh1m: new PictureModel(
    'Kilauea - Tilt SDH station past month',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/SDH-TILT-1mo.png',
    'Kilauea - Tilt SDH station past month',
    900,
    300,
    'Electronic tilt at the Kilauea summit area for the past 2 days',
    4 * 3600,
  ),
  kilaueaGps1y: new PictureModel(
    'Kilauea - GPS past year',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_year.png',
    'Kilauea - GPS past year',
    900,
    300,
    'GPS signal at the Kilauea summit area for the past year',
    24 * 3600,
  ),
  kilaueaGps5y: new PictureModel(
    'Kilauea - GPS past 5 years',
    'Summit Area',
    'kilaueaMonitoring',
    'volcanoes',
    'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_5years.png',
    'Kilauea - GPS past 5 years',
    900,
    300,
    'GPS signal at the Kilauea summit area for the past 5 years',
    24 * 3600,
  ),
  nsidcArcticIceCon: new PictureModel(
    'Arctic - Sea ice concentration',
    '',
    'nsidcArctic',
    'ice',
    'https://nsidc.org/data/seaice_index/images/daily_images/N_daily_concentration.png',
    'Arctic - Sea ice concentration',
    420,
    500,
    'Daily arctic sea ice concentration map',
    24 * 3600,
    true,
  ),
  nsidcArcticIceTime: new PictureModel(
    'Arctic - Sea ice area timeseries',
    '',
    'nsidcArctic',
    'ice',
    'https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
    'Arctic - Sea ice area timeseries',
    1050,
    840,
    'Daily arctic sea ice extent timeseries',
    24 * 3600,
    true,
  ),
  nsidcAntarcticIceCon: new PictureModel(
    'Antarctic - Sea ice concentration',
    '',
    'nsidcArctic',
    'ice',
    'https://nsidc.org/data/seaice_index/images/daily_images/S_daily_concentration.png',
    'Antarctic - Sea ice concentration',
    420,
    500,
    'Daily arctic sea ice concentration map',
    24 * 3600,
    true,
  ),
  nsidcAntarcticIceTime: new PictureModel(
    'Antarctic - Sea ice area timeseries',
    '',
    'nsidcArctic',
    'ice',
    'https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
    'Antarctic - Sea ice area timeseries',
    1050,
    840,
    'Daily arctic sea ice extent timeseries',
    24 * 3600,
    true,
  ),
  nsidcGreenlandMeltArea: new PictureModel(
    'Greenland - Melt area',
    '',
    'nsidcGreenland',
    'ice',
    'https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
    'Greenland - Melt area',
    1200,
    1800,
    'Daily Greenland melt area',
    24 * 3600,
    true,
  ),
  nsidcGreenlandMeltDays: new PictureModel(
    'Greenland - Cumulated melt days',
    '',
    'nsidcGreenland',
    'ice',
    'https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
    'Greenland - Cumulated melt days',
    1200,
    1800,
    'Cumulated melt days of the Greenland ice sheet',
    24 * 3600,
    true,
  ),
};
