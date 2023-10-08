import './App.scss';

import { FunctionComponent } from 'react';
import { Card, CardImage, CardLegend, CardSource, CardSubtitle, CardTitle } from '../lib/Card';
import { Image } from '../lib/Image';
import { VisibleListener } from '../lib/Visible';
import { Header } from './Header';
import { Main } from './Main';

export const App: FunctionComponent = () => (
  <div className="app">
    <VisibleListener>
      <Header />
      <Main>
        <Card>
          <CardTitle>Kilauea - Tilt past 2 days</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_uwe_tilt_2day.png"
              alt="Kilauea - Tilt past 2 days"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>Electronic tilt at the Kilauea summit area for the past 2 days</CardLegend>
        </Card>

        <Card>
          <CardTitle>Kilauea - Tilt past week</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_week.png"
              alt="Kilauea - Tilt past week"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>Electronic tilt at the Kilauea summit area for the past week</CardLegend>
        </Card>

        <Card>
          <CardTitle>Kilauea - Tilt past month</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_erz_tilt_month.png"
              alt="Kilauea - Tilt past month"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>Electronic tilt at the Kilauea summit area for the past month</CardLegend>
        </Card>

        <Card>
          <CardTitle>Kilauea - Tilt SDH station past month</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/SDH-TILT-1mo.png"
              alt="Kilauea - Tilt SDH station past month"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>Electronic tilt at the Kilauea summit area for the past 2 days</CardLegend>
        </Card>

        <Card>
          <CardTitle>Kilauea - GPS past year</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_year.png"
              alt="Kilauea - GPS past year"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>GPS signal at the Kilauea summit area for the past year</CardLegend>
        </Card>

        <Card>
          <CardTitle>Kilauea - GPS past 5 years</CardTitle>
          <CardSubtitle>
            Summit Area&nbsp;
            <CardSource name="USGS" url="https://www.usgs.gov/volcanoes/kilauea/monitoring-data" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://volcanoes.usgs.gov/vsc/captures/kilauea/summit_caldera_gps_5years.png"
              alt="Kilauea - GPS past 5 years"
              width={900}
              height={300}
            />
          </CardImage>
          <CardLegend>GPS signal at the Kilauea summit area for the past 5 years</CardLegend>
        </Card>

        <Card>
          <CardTitle>Arctic - Sea ice concentration</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/arcticseaicenews/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/data/seaice_index/images/daily_images/N_daily_concentration.png"
              alt="Arctic - Sea ice concentration"
              width={420}
              height={500}
            />
          </CardImage>
          <CardLegend>Daily arctic sea ice concentration map</CardLegend>
        </Card>

        <Card>
          <CardTitle>Arctic - Sea ice area timeseries</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/arcticseaicenews/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/data/seaice_index/images/daily_images/N_iqr_timeseries.png"
              alt="Arctic - Sea ice area timeseries"
              width={1050}
              height={840}
            />
          </CardImage>
          <CardLegend>Daily arctic sea ice extent timeseries</CardLegend>
        </Card>

        <Card>
          <CardTitle>Arctic - Daily sea ice thickness</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Polar Portal"
              url="http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://images.weserv.nl/?url=http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]"
              alt="Arctic - Daily sea ice thickness"
              width={1109}
              height={1218}
              timed
            />
          </CardImage>
          <CardLegend>Daily thickness of the arctic sea ice</CardLegend>
        </Card>

        <Card>
          <CardTitle>Arctic - Sea ice volume timeseries</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Polar Portal"
              url="http://polarportal.dk/en/sea-ice-and-icebergs/sea-ice-thickness-and-volume/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://images.weserv.nl/?url=http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]"
              alt="Arctic - Sea ice volume timeseries"
              width={1093}
              height={904}
              timed
            />
          </CardImage>
          <CardLegend>Timeseries of the total volume of arctic sea ice</CardLegend>
        </Card>

        <Card>
          <CardTitle>Antarctic - Sea ice concentration</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/arcticseaicenews/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/data/seaice_index/images/daily_images/S_daily_concentration.png"
              alt="Antarctic - Sea ice concentration"
              width={420}
              height={500}
            />
          </CardImage>
          <CardLegend>Daily arctic sea ice concentration map</CardLegend>
        </Card>

        <Card>
          <CardTitle>Antarctic - Sea ice area timeseries</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/arcticseaicenews/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/data/seaice_index/images/daily_images/S_iqr_timeseries.png"
              alt="Antarctic - Sea ice area timeseries"
              width={1050}
              height={840}
            />
          </CardImage>
          <CardLegend>Daily arctic sea ice extent timeseries</CardLegend>
        </Card>

        <Card>
          <CardTitle>Greenland - Melt area</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/greenland-today/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/greenland-today/images/greenland_daily_melt.png"
              alt="Greenland - Melt area"
              width={1200}
              height={1800}
            />
          </CardImage>
          <CardLegend>Daily Greenland melt area</CardLegend>
        </Card>

        <Card>
          <CardTitle>Greenland - Cumulated melt days</CardTitle>
          <CardSubtitle>
            <CardSource name="NSIDC" url="https://nsidc.org/greenland-today/" />
          </CardSubtitle>
          <CardImage>
            <Image
              url="https://nsidc.org/greenland-today/images/greenland_cumulative_melt.png"
              alt="Greenland - Cumulated melt days"
              width={1200}
              height={1800}
            />
          </CardImage>
          <CardLegend>Cumulated melt days of the Greenland ice sheet</CardLegend>
        </Card>

        <Card>
          <CardTitle>Greenland - Surface mass balance</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Polar Portal"
              url="http://polarportal.dk/en/greenland/surface-conditions/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://images.weserv.nl/?url=http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]"
              alt="Greenland - Surface mass balance"
              width={678}
              height={1063}
              timed
            />
          </CardImage>
          <CardLegend>Daily surface mass balance of the Greenland ice sheet</CardLegend>
        </Card>

        <Card>
          <CardTitle>Greenland - Cumulated surface mass balance</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Polar Portal"
              url="http://polarportal.dk/en/greenland/surface-conditions/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://images.weserv.nl/?url=http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]"
              alt="Greenland - Cumulated surface mass balance"
              width={679}
              height={1063}
              timed
            />
          </CardImage>
          <CardLegend>Cumulated surface mass balance of the Greenland ice sheet</CardLegend>
        </Card>

        <Card>
          <CardTitle>Greenland - Surface mass balance timeseries</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Polar Portal"
              url="http://polarportal.dk/en/greenland/surface-conditions/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://images.weserv.nl/?url=http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]"
              alt="Greenland - Surface mass balance timeseries"
              width={846}
              height={1080}
              timed
            />
          </CardImage>
          <CardLegend>Timeseries of the surface mass balance of the Greenland ice sheet</CardLegend>
        </Card>

        <Card>
          <CardTitle>World - Sea surface temperature</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Climate Reanalyzer"
              url="https://climatereanalyzer.org/clim/sst_daily/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]"
              alt="World - Sea surface temperature"
              width={1100}
              height={759}
              timed
            />
          </CardImage>
          <CardLegend>Daily surface temperature of the world&apos;s oceans</CardLegend>
        </Card>

        <Card>
          <CardTitle>World - Sea surface temperature anomaly</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Climate Reanalyzer"
              url="https://climatereanalyzer.org/clim/sst_daily/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]"
              alt="World - Sea surface temperature anomaly"
              width={1100}
              height={764}
              timed
            />
          </CardImage>
          <CardLegend>
            Daily surface temperature anomaly of the world&apos;s oceans (compared to 1971-2000
            baseline)
          </CardLegend>
        </Card>

        <Card>
          <CardTitle>World - Air temperature at 2 meters</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Climate Reanalyzer"
              url="https://climatereanalyzer.org/clim/t2_daily/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]"
              alt="World - Air temperature at 2 meters"
              width={1024}
              height={742}
              timed
            />
          </CardImage>
          <CardLegend>Daily worldwide air temperature at 2 meters of altitude</CardLegend>
        </Card>

        <Card>
          <CardTitle>World - Air temperature anomaly at 2 meters</CardTitle>
          <CardSubtitle>
            <CardSource
              name="Climate Reanalyzer"
              url="https://climatereanalyzer.org/clim/t2_daily/"
            />
          </CardSubtitle>
          <CardImage>
            <Image
              url="[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]"
              alt="World - Air temperature at 2 meters"
              width={1024}
              height={741}
              timed
            />
          </CardImage>
          <CardLegend>
            Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000
            baseline)
          </CardLegend>
        </Card>
      </Main>
    </VisibleListener>
  </div>
);
