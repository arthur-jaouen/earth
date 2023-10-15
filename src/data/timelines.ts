import { ManipulateType } from 'dayjs';
import { Categories } from './categories';
import { Sources } from './sources';

export type TimelineMeta = {
  title: string;
  subtitle: string;
  source: keyof Sources;
  category: keyof Categories;
  template: string;
  alt: string;
  width: number;
  height: number;
  legend?: string;
  duration?: number;
  unit?: ManipulateType;
  tries?: number;
};

export type Timelines = typeof timelines;

export const timelines = {
  ppArcticThickness: {
    title: 'Arctic - Daily sea ice thickness',
    subtitle: '',
    source: 'ppArctic',
    category: 'ice',
    template:
      '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]',
    alt: 'Arctic - Daily sea ice thickness',
    width: 1109,
    height: 1218,
    legend: 'Daily thickness of the arctic sea ice',
  } as TimelineMeta,
  ppArcticVolume: {
    title: 'Arctic - Sea ice volume timeseries',
    subtitle: '',
    source: 'ppArctic',
    category: 'ice',
    template:
      '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]',
    alt: 'Arctic - Sea ice volume timeseries',
    width: 1093,
    height: 904,
    legend: 'Timeseries of the total volume of arctic sea ice',
  } as TimelineMeta,
  ppGreenlandSmb: {
    title: 'Greenland - Surface mass balance',
    subtitle: '',
    source: 'ppGreenland',
    category: 'ice',
    template:
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]',
    alt: 'Greenland - Surface mass balance',
    width: 678,
    height: 1063,
    legend: 'Daily surface mass balance of the Greenland ice sheet',
  } as TimelineMeta,
  ppGreenlandCumSmb: {
    title: 'Greenland - Cumulated surface mass balance',
    subtitle: '',
    source: 'ppGreenland',
    category: 'ice',
    template:
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]',
    alt: 'Greenland - Cumulated surface mass balance',
    width: 679,
    height: 1063,
    legend: 'Cumulated surface mass balance of the Greenland ice sheet',
  } as TimelineMeta,
  ppGreenlandSmbTs: {
    title: 'Greenland - Surface mass balance timeseries',
    subtitle: '',
    source: 'ppGreenland',
    category: 'ice',
    template:
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]',
    alt: 'Greenland - Surface mass balance timeseries',
    width: 846,
    height: 1080,
    legend: 'Timeseries of the surface mass balance of the Greenland ice sheet',
  } as TimelineMeta,
  crSst: {
    title: 'World - Sea surface temperature',
    subtitle: '',
    source: 'crSst',
    category: 'oceans',
    template:
      '[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]',
    alt: 'World - Sea surface temperature',
    width: 1100,
    height: 759,
    legend: "Daily surface temperature of the world's oceans",
  } as TimelineMeta,
  crSstAnom: {
    title: 'World - Sea surface temperature anomaly',
    subtitle: '',
    source: 'crSst',
    category: 'oceans',
    template:
      '[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]',
    alt: 'World - Sea surface temperature anomaly',
    width: 1100,
    height: 764,
    legend:
      "Daily surface temperature anomaly of the world's oceans (compared to 1971-2000 baseline)",
  } as TimelineMeta,
  crT2: {
    title: 'World - Air temperature at 2 meters',
    subtitle: '',
    source: 'crT2',
    category: 'atmosphere',
    template:
      '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]',
    alt: 'World - Air temperature at 2 meters',
    width: 1024,
    height: 742,
    legend: 'Daily worldwide air temperature at 2 meters of altitude',
  } as TimelineMeta,
  crT2Anom: {
    title: 'World - Air temperature anomaly at 2 meters',
    subtitle: '',
    source: 'crT2',
    category: 'atmosphere',
    template:
      '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]',
    alt: 'World - Air temperature at 2 meters',
    width: 1024,
    height: 741,
    legend:
      'Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000 baseline)',
  } as TimelineMeta,
};
