import { createTable } from '../lib/Table';
import { TimelineModel } from './TimelineModel';

export type TimelineTable = typeof Timelines;

export const Timelines = createTable([
  new TimelineModel(
    'nsidcArcticIceCon',
    'Arctic - Sea ice concentration',
    undefined,
    'nsidcArctic',
    'ice',
    '[https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/]YYYY[/]MM[_]MMM[/N_]YYYYMMDD[_conc_v3.0.png]',
    'Arctic - Sea ice concentration',
    420,
    500,
    'Daily arctic sea ice concentration map',
  ),
  new TimelineModel(
    'nsidcAntarcticIceCon',
    'Antarctic - Sea ice concentration',
    undefined,
    'nsidcArctic',
    'ice',
    '[https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/]YYYY[/]MM[_]MMM[/S_]YYYYMMDD[_conc_v3.0.png]',
    'Antarctic - Sea ice concentration',
    420,
    500,
    'Daily arctic sea ice concentration map',
  ),
  new TimelineModel(
    'ppArcticThickness',
    'Arctic - Daily sea ice thickness',
    undefined,
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]',
    'Arctic - Daily sea ice thickness',
    1109,
    1218,
    'Daily thickness of the arctic sea ice',
  ),
  new TimelineModel(
    'ppArcticVolume',
    'Arctic - Sea ice volume timeseries',
    undefined,
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]',
    'Arctic - Sea ice volume timeseries',
    1093,
    904,
    'Timeseries of the total volume of arctic sea ice',
  ),
  new TimelineModel(
    'ppGreenlandSmb',
    'Greenland - Surface mass balance',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]',
    'Greenland - Surface mass balance',
    678,
    1063,
    'Daily surface mass balance of the Greenland ice sheet',
  ),
  new TimelineModel(
    'ppGreenlandCumSmb',
    'Greenland - Cumulated surface mass balance',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]',
    'Greenland - Cumulated surface mass balance',
    679,
    1063,
    'Cumulated surface mass balance of the Greenland ice sheet',
  ),
  new TimelineModel(
    'ppGreenlandSmbTs',
    'Greenland - Surface mass balance timeseries',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]',
    'Greenland - Surface mass balance timeseries',
    846,
    1080,
    'Timeseries of the surface mass balance of the Greenland ice sheet',
  ),
  new TimelineModel(
    'crSst',
    'World - Sea surface temperature',
    undefined,
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]',
    'World - Sea surface temperature',
    1100,
    796,
    "Daily surface temperature of the world's oceans",
  ),
  new TimelineModel(
    'crSstAnom',
    'World - Sea surface temperature anomaly',
    undefined,
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]',
    'World - Sea surface temperature anomaly',
    1100,
    794,
    "Daily surface temperature anomaly of the world's oceans (compared to 1971-2000 baseline)",
  ),
  new TimelineModel(
    'crT2',
    'World - Air temperature at 2 meters',
    undefined,
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]',
    'World - Air temperature at 2 meters',
    1024,
    742,
    'Daily worldwide air temperature at 2 meters of altitude',
  ),
  new TimelineModel(
    'crT2Anom',
    'World - Air temperature anomaly at 2 meters',
    undefined,
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]',
    'World - Air temperature at 2 meters',
    1024,
    741,
    'Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000 baseline)',
  ),
]);
