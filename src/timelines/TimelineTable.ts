import { Table } from '../lib/Table'
import { TimelineModel } from './TimelineModel'

export const Timelines = new Table(TimelineModel)
  .add(
    'vedurReykjanesEarthquakes',
    'Iceland - Earthquakes Reykjanes peninsula',
    undefined,
    'vedurReykjanesEarthquakes',
    'volcanoes',
    '[https://en.vedur.is/photos/jarrnes/]YYMMDD_HH[00.png]',
    540,
    400,
    'Earthquakes in the Reykjanes peninsula during the last 48 hours',
    'hour',
  )
  .add(
    'nsidcArcticIceCon',
    'Arctic - Sea ice concentration',
    undefined,
    'nsidcArctic',
    'ice',
    '[https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/]YYYY[/]MM[_]MMM[/N_]YYYYMMDD[_conc_v3.0.png]',
    420,
    500,
    'Daily arctic sea ice concentration map',
  )
  .add(
    'nsidcAntarcticIceCon',
    'Antarctic - Sea ice concentration',
    undefined,
    'nsidcArctic',
    'ice',
    '[https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/]YYYY[/]MM[_]MMM[/S_]YYYYMMDD[_conc_v3.0.png]',
    420,
    500,
    'Daily arctic sea ice concentration map',
  )
  .add(
    'ppArcticThickness',
    'Arctic - Daily sea ice thickness',
    undefined,
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]',
    1109,
    1218,
    'Daily thickness of the arctic sea ice',
  )
  .add(
    'ppArcticVolume',
    'Arctic - Sea ice volume timeseries',
    undefined,
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]',
    1093,
    904,
    'Timeseries of the total volume of arctic sea ice',
  )
  .add(
    'ppGreenlandSmb',
    'Greenland - Surface mass balance',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]',
    678,
    1063,
    'Daily surface mass balance of the Greenland ice sheet',
  )
  .add(
    'ppGreenlandCumSmb',
    'Greenland - Cumulated surface mass balance',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]',
    679,
    1063,
    'Cumulated surface mass balance of the Greenland ice sheet',
  )
  .add(
    'ppGreenlandSmbTs',
    'Greenland - Surface mass balance timeseries',
    undefined,
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]',
    846,
    1080,
    'Timeseries of the surface mass balance of the Greenland ice sheet',
  )
  .add(
    'crSst',
    'World - Sea surface temperature',
    undefined,
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]',
    1100,
    796,
    "Daily surface temperature of the world's oceans",
  )
  .add(
    'crSstAnom',
    'World - Sea surface temperature anomaly',
    undefined,
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]',
    1100,
    794,
    "Daily surface temperature anomaly of the world's oceans (compared to 1971-2000 baseline)",
  )
  .add(
    'crT2',
    'World - Surface air temperature',
    undefined,
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]',
    1024,
    742,
    'Daily worldwide air temperature at 2 meters of altitude',
  )
  .add(
    'crT2Anom',
    'World - Surface air temperature anomaly',
    undefined,
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]',
    1024,
    741,
    'Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000 baseline)',
  )
