import { GiIceCube, GiVolcano, GiWaveCrest, GiWhirlwind } from 'react-icons/gi'
import {
  Author,
  AuthorItem,
  Bounds,
  Category,
  CategoryChild,
  Coords,
  Dim,
  Legend,
  LocationItem,
  Media,
  Picture,
  Source,
  SourceItem,
  Tag,
  Timeline,
  Url,
} from './Components'
import {
  AuthorSystem,
  CategorySystem,
  LocationSystem,
  PictureSystem,
  SourceSystem,
  TimelineSystem,
} from './Systems'

export const Authors = {
  climateReanalyzer: AuthorSystem.create(
    new Media('Climate Reanalyzer'),
    new Author(),
    new Url('https://climatereanalyzer.org'),
  ),
  usgs: AuthorSystem.create(new Media('USGS'), new Author(), new Url('https://www.usgs.gov')),
  nsidc: AuthorSystem.create(new Media('NSIDC'), new Author(), new Url('https://nsidc.org')),
  polarPortal: AuthorSystem.create(
    new Media('Polar Portal'),
    new Author(),
    new Url('http://polarportal.dk'),
  ),
  vedur: AuthorSystem.create(
    new Media('Icelandic Met Office'),
    new Author(),
    new Url('http://polarportal.dk'),
  ),
}

export const Categories = {
  volcanoes: CategorySystem.create(
    new Media('Volcanoes'),
    new Category(GiVolcano),
    new Tag('volcanoes'),
  ),
  oceans: CategorySystem.create(new Media('Oceans'), new Category(GiWaveCrest), new Tag('oceans')),
  ice: CategorySystem.create(new Media('Ice'), new Category(GiIceCube), new Tag('ice')),
  atmosphere: CategorySystem.create(
    new Media('Atmosphere'),
    new Category(GiWhirlwind),
    new Tag('atmosphere'),
  ),
}

export const Locations = {
  earth: LocationSystem.create(new Media('Earth'), new Coords(0, 0), new Bounds(0, 0, 0, 0)),
  arctic: LocationSystem.create(new Media('Arctic'), new Coords(0, 0), new Bounds(0, 0, 0, 0)),
  antarctic: LocationSystem.create(
    new Media('Antarctic'),
    new Coords(0, 0),
    new Bounds(0, 0, 0, 0),
  ),
  greenland: LocationSystem.create(
    new Media('Greenland'),
    new Coords(0, 0),
    new Bounds(0, 0, 0, 0),
  ),
  kilauea: LocationSystem.create(new Media('Kilauea'), new Coords(0, 0), new Bounds(0, 0, 0, 0)),
  reykjanes: LocationSystem.create(
    new Media('Reykjanes'),
    new Coords(0, 0),
    new Bounds(0, 0, 0, 0),
  ),
}

export const Sources = {
  climateReanalyzerSeaSurfaceTemp: SourceSystem.create(
    new Media('Climate Reanalyzer - Sea Surface Temperature'),
    new Source(),
    new Url('https://climatereanalyzer.org/clim/sst_daily/'),
    new AuthorItem(Authors.climateReanalyzer),
  ),
  climateReanalyzerAirSurfaceTemp: SourceSystem.create(
    new Media('Climate Reanalyzer - Air Surface Temperature'),
    new Source(),
    new Url('https://climatereanalyzer.org/clim/t2_daily/'),
    new AuthorItem(Authors.climateReanalyzer),
  ),
  usgsKilaueaMonitorging: SourceSystem.create(
    new Media('USGS - Kilauea Monitoring'),
    new Source(),
    new Url('https://www.usgs.gov/volcanoes/kilauea/monitoring-data'),
    new AuthorItem(Authors.usgs),
  ),
  usgsKilaueaMonitorgingPastWeek: SourceSystem.create(
    new Media('USGS - Kilauea Monitoring - Past Week'),
    new Source(),
    new Url('https://www.usgs.gov/volcanoes/kilauea/past-week-monitoring-data-kilauea'),
    new AuthorItem(Authors.usgs),
  ),
  nsidcSeaIce: SourceSystem.create(
    new Media('NSIDC - Sea Ice Monitoring'),
    new Source(),
    new Url('https://nsidc.org/arcticseaicenews/'),
    new AuthorItem(Authors.nsidc),
  ),
  nsidcGreenland: SourceSystem.create(
    new Media('NSIDC - Greenland Monitoring'),
    new Source(),
    new Url('https://nsidc.org/greenland-today/'),
    new AuthorItem(Authors.nsidc),
  ),
  polarPortalSeaIce: SourceSystem.create(
    new Media('Polar Portal - Sea Ice Monitoring'),
    new Source(),
    new Url('http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/'),
    new AuthorItem(Authors.polarPortal),
  ),
  polarPortalGreenland: SourceSystem.create(
    new Media('Polar Portal - Greenland Ice Monitoring'),
    new Source(),
    new Url('http://polarportal.dk/en/greenland/surface-conditions/'),
    new AuthorItem(Authors.polarPortal),
  ),
  vedurEarthquakesReykjanes: SourceSystem.create(
    new Media('Icelandic Met Office - Earthquakes - Reykjanes Peninsula'),
    new Source(),
    new Url('https://en.vedur.is/earthquakes-and-volcanism/earthquakes/reykjanespeninsula'),
    new AuthorItem(Authors.vedur),
  ),
}

export const Pictures = {
  kilaueaTiltTwoDays: PictureSystem.create(
    new Media('Kilauea - Tilt past two days', 'Summit Area'),
    new Picture('https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_uwe_tilt_2day.png', 600),
    new Legend('Electronic tilt at the Kilauea summit area for the past two days'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaTiltTwoDays'),
  ),
  kilaueaTiltOneWeek: PictureSystem.create(
    new Media('Kilauea - Tilt past week', 'Summit Area'),
    new Picture('https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_week.png', 3600),
    new Legend('Electronic tilt at the Kilauea summit area for the past week'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaTiltOneWeek'),
  ),
  kilaueaTiltOneMonth: PictureSystem.create(
    new Media('Kilauea - Tilt past month', 'Summit Area'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_month.png',
      4 * 3600,
    ),
    new Legend('Electronic tilt at the Kilauea summit area for the past month'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaTiltOneMonth'),
  ),
  kilaueaTiltOneMonthSdh: PictureSystem.create(
    new Media('Kilauea - Tilt SDH station past month', 'Summit Area'),
    new Picture('https://volcanoes.usgs.gov/vsc/captures/kilauea/SDH-TILT-1mo.png', 4 * 3600),
    new Legend('Electronic tilt at the Kilauea Sandy Hill station for the past month'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaTiltOneMonthSdh'),
  ),
  kilaueaGpsOneYear: PictureSystem.create(
    new Media('Kilauea - GPS past year', 'Summit Area'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_year.png',
      24 * 3600,
    ),
    new Legend('GPS signal at the Kilauea summit area for the past year'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaGpsOneYear'),
  ),
  kilaueaGpsFiveYear: PictureSystem.create(
    new Media('Kilauea - GPS past five years', 'Summit Area'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_5years.png',
      24 * 3600,
    ),
    new Legend('GPS signal at the Kilauea summit area for the past year'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorging),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaGpsFiveYear'),
  ),
  kilaueaEarthquakeMap: PictureSystem.create(
    new Media('Kilauea - Earthquake map past week'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/earthquake_map_past_week.png',
      3600,
    ),
    new Legend('Erthquake map at the Kilauea volcano for the past week'),
    new Dim(900, 716),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorgingPastWeek),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaEarthquakeMap'),
  ),
  kilaueaEarthquakeRates: PictureSystem.create(
    new Media('Kilauea - Earthquake rates past week'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/earthquake_counts_day_past_week.png',
      3600,
    ),
    new Legend('Erthquake rates at the Kilauea volcano for the past week'),
    new Dim(900, 300),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorgingPastWeek),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaEarthquakeRates'),
  ),
  kilaueaEarthquakeDepths: PictureSystem.create(
    new Media('Kilauea - Earthquake depths past week'),
    new Picture(
      'https://volcanoes.usgs.gov/vsc/captures/kilauea/earthquake_time_depth_week.png',
      3600,
    ),
    new Legend('Erthquake depths at the Kilauea volcano for the past week'),
    new Dim(900, 415),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.usgsKilaueaMonitorgingPastWeek),
    new LocationItem(Locations.kilauea),
    new Tag('kilaueaEarthquakeDepths'),
  ),
  nsidcArcticIceTime: PictureSystem.create(
    new Media('Arctic - Sea ice area timeseries'),
    new Picture(
      'https://wsrv.nl?maxage=1d&url=https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
      24 * 3600,
      'https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png',
    ),
    new Legend('Daily arctic sea ice extent timeseries'),
    new Dim(1050, 840),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcSeaIce),
    new LocationItem(Locations.arctic),
    new Tag('nsidcArcticIceTime'),
  ),
  nsidcAntarcticIceTime: PictureSystem.create(
    new Media('Antarctic - Sea ice area timeseries'),
    new Picture(
      'https://wsrv.nl?maxage=1d&url=https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
      24 * 3600,
      'https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png',
    ),
    new Legend('Daily antarctic sea ice extent timeseries'),
    new Dim(1050, 840),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcSeaIce),
    new LocationItem(Locations.antarctic),
    new Tag('nsidcAntarcticIceTime'),
  ),
  nsidcGreenlandMeltArea: PictureSystem.create(
    new Media('Greenland - Melt area'),
    new Picture(
      'https://wsrv.nl?maxage=1d&url=https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
      24 * 3600,
      'https://nsidc.org/greenland-today/images/greenland_daily_melt.png',
    ),
    new Legend('Daily Greenland melt area'),
    new Dim(1050, 840),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcGreenland),
    new LocationItem(Locations.greenland),
    new Tag('nsidcGreenlandMeltArea'),
  ),
  nsidcGreenlandMeltDays: PictureSystem.create(
    new Media('Greenland - Cumulated melt days'),
    new Picture(
      'https://wsrv.nl?maxage=1d&url=https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
      24 * 3600,
      'https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png',
    ),
    new Legend('Cumulated melt days of the Greenland ice sheet'),
    new Dim(1050, 840),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcGreenland),
    new LocationItem(Locations.greenland),
    new Tag('nsidcGreenlandMeltDays'),
  ),
}

export const Timelines = {
  vedurReykjanesEarthquakes: TimelineSystem.create(
    new Media('Iceland - Earthquakes Reykjanes peninsula'),
    new Timeline('[https://en.vedur.is/photos/jarrnes/]YYMMDD_HH[00.png]', 'hour'),
    new Legend('Earthquakes in the Reykjanes peninsula during the last 48 hours'),
    new Dim(540, 400),
    new CategoryChild(Categories.volcanoes),
    new SourceItem(Sources.vedurEarthquakesReykjanes),
    new LocationItem(Locations.reykjanes),
    new Tag('vedurReykjanesEarthquakes'),
  ),
  nsidcArcticIceCon: TimelineSystem.create(
    new Media('Arctic - Sea ice concentration'),
    new Timeline(
      '[https://noaadata.apps.nsidc.org/NOAA/G02135/north/daily/images/]YYYY[/]MM[_]MMM[/N_]YYYYMMDD[_conc_v3.0.png]',
    ),
    new Legend('Daily arctic sea ice concentration map'),
    new Dim(420, 500),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcSeaIce),
    new LocationItem(Locations.arctic),
    new Tag('nsidcArcticIceCon'),
  ),
  nsidcAntarcticIceCon: TimelineSystem.create(
    new Media('Antarctic - Sea ice concentration'),
    new Timeline(
      '[https://noaadata.apps.nsidc.org/NOAA/G02135/south/daily/images/]YYYY[/]MM[_]MMM[/S_]YYYYMMDD[_conc_v3.0.png]',
    ),
    new Legend('Daily arctic sea ice concentration map'),
    new Dim(420, 500),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.nsidcSeaIce),
    new LocationItem(Locations.antarctic),
    new Tag('nsidcAntarcticIceCon'),
  ),
  polarPortalArcticThickness: TimelineSystem.create(
    new Media('Arctic - Daily sea ice thickness'),
    new Timeline(
      '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]',
    ),
    new Legend('Daily thickness of the arctic sea ice'),
    new Dim(1109, 1218),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.polarPortalSeaIce),
    new LocationItem(Locations.arctic),
    new Tag('polarPortalArcticThickness'),
  ),
  polarPortalArcticVolume: TimelineSystem.create(
    new Media('Arctic - Sea ice volume timeseries'),
    new Timeline(
      '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]',
    ),
    new Legend('Timeseries of the total volume of arctic sea ice'),
    new Dim(1093, 904),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.polarPortalSeaIce),
    new LocationItem(Locations.arctic),
    new Tag('polarPortalArcticVolume'),
  ),
  polarPortalGreenlandSmb: TimelineSystem.create(
    new Media('Greenland - Surface mass balance'),
    new Timeline(
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]',
    ),
    new Legend('Daily surface mass balance of the Greenland ice sheet'),
    new Dim(678, 1063),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.polarPortalGreenland),
    new LocationItem(Locations.greenland),
    new Tag('polarPortalGreenlandSmb'),
  ),
  polarPortalGreenlandCumSmb: TimelineSystem.create(
    new Media('Greenland - Cumulated surface mass balance'),
    new Timeline(
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]',
    ),
    new Legend('Cumulated surface mass balance of the Greenland ice sheet'),
    new Dim(679, 1063),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.polarPortalGreenland),
    new LocationItem(Locations.greenland),
    new Tag('polarPortalGreenlandCumSmb'),
  ),
  polarPortalGreenlandSmbTs: TimelineSystem.create(
    new Media('Greenland - Surface mass balance timeseries'),
    new Timeline(
      '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]',
    ),
    new Legend('Timeseries of the surface mass balance of the Greenland ice sheet'),
    new Dim(846, 1080),
    new CategoryChild(Categories.ice),
    new SourceItem(Sources.polarPortalGreenland),
    new LocationItem(Locations.greenland),
    new Tag('polarPortalGreenlandSmbTs'),
  ),
  climateReanalyzerSeaSurfaceTemp: TimelineSystem.create(
    new Media('World - Sea surface temperature'),
    new Timeline(
      '[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]',
    ),
    new Legend('Daily surface temperature of the  oceans'),
    new Dim(1100, 796),
    new CategoryChild(Categories.oceans),
    new SourceItem(Sources.climateReanalyzerSeaSurfaceTemp),
    new LocationItem(Locations.earth),
    new Tag('climateReanalyzerSeaSurfaceTemp'),
  ),
  climateReanalyzerSeaSurfaceTempAnom: TimelineSystem.create(
    new Media('World - Sea surface temperature anomaly'),
    new Timeline(
      '[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]',
    ),
    new Legend('Daily surface temperature anomaly of the oceans (compared to 1971-2000 baseline)'),
    new Dim(1100, 794),
    new CategoryChild(Categories.oceans),
    new SourceItem(Sources.climateReanalyzerSeaSurfaceTemp),
    new LocationItem(Locations.earth),
    new Tag('climateReanalyzerSeaSurfaceTempAnom'),
  ),
  climateReanalyzerAirSurfaceTemp: TimelineSystem.create(
    new Media('World - Surface air temperature'),
    new Timeline(
      '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]',
    ),
    new Legend('Daily worldwide air temperature at 2 meters of altitude'),
    new Dim(1024, 742),
    new CategoryChild(Categories.atmosphere),
    new SourceItem(Sources.climateReanalyzerAirSurfaceTemp),
    new LocationItem(Locations.earth),
    new Tag('climateReanalyzerAirSurfaceTemp'),
  ),
  climateReanalyzerAirSurfaceTempAnom: TimelineSystem.create(
    new Media('World - Surface air temperature anomaly'),
    new Timeline(
      '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]',
    ),
    new Legend(
      'Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000 baseline)',
    ),
    new Dim(1024, 741),
    new CategoryChild(Categories.atmosphere),
    new SourceItem(Sources.climateReanalyzerAirSurfaceTemp),
    new LocationItem(Locations.earth),
    new Tag('climateReanalyzerAirSurfaceTempAnom'),
  ),
}
