import dayjs, { ManipulateType } from 'dayjs';
import { setPicturePending } from '../store/PictureSlice';
import { Dispatch, State } from '../store/Store';
import {
  setTimelineError,
  setTimelineLoading,
  setTimelineOffset,
  setTimelineSuccess,
} from '../store/TimelineSlice';
import { CategoryTable } from './CategoryModel';
import { PictureModel } from './PictureModel';
import { SourceTable } from './SourceModel';

export class TimelineModel {
  constructor(
    public title: string,
    public subtitle: string,
    public source: keyof SourceTable,
    public category: keyof CategoryTable,
    public template: string,
    public alt: string,
    public width: number,
    public height: number,
    public legend: string,
    public tries: number = 10,
    public duration: number = 1,
    public unit: ManipulateType = 'day',
  ) {}

  get aspectRatio(): number {
    return this.width / this.height;
  }

  loadData(id: string) {
    return async (dispatch: Dispatch): Promise<void> => {
      dispatch(setTimelineLoading({ id }));

      try {
        const date = await this.getLatestDate();

        dispatch(setPicturePending({ id: this.getPictureId(id, date) }));
        dispatch(setTimelineSuccess({ id, latest: date, offset: 0 }));

        return;
      } catch (error) {
        console.error(error);

        dispatch(setTimelineError({ id, error }));
      }
    };
  }

  loadAtOffset(id: string, offset: number) {
    return async (dispatch: Dispatch, getState: () => State) => {
      const { latest } = getState().timelines[id];

      const date = dayjs(latest)
        .add(offset * this.duration, this.unit)
        .toISOString();

      const pictureId = this.getPictureId(id, date);
      const picture = getState().pictures[pictureId];

      if (!picture) {
        dispatch(setPicturePending({ id: pictureId }));
      }

      dispatch(setTimelineOffset({ id, offset }));
    };
  }

  getPictureId(id: string, date: string): string {
    return `${id}_${date}`;
  }

  getPictureUrl(date: string): string {
    const url = dayjs(date).format(this.template);

    return `https://wsrv.nl?url=${url}`;
  }

  async getLatestDate(): Promise<string> {
    const start = dayjs().startOf(this.unit);

    for (let count = 0; count < this.tries; count++) {
      try {
        const date = start.subtract(count * this.duration, this.unit).toISOString();
        const response = await fetch(this.getPictureUrl(date), { method: 'HEAD' });

        if (response.status === 200) {
          return date;
        }
      } catch (error) {
        // Nothing, just try next date
      }
    }

    throw Error('Not found');
  }

  getPictureModel(date: string): PictureModel {
    return new PictureModel(
      this.title,
      this.subtitle,
      this.source,
      this.category,
      this.getPictureUrl(date),
      this.alt,
      this.width,
      this.height,
      this.legend,
      365 * 24 * 3600,
    );
  }
}

export type TimelineTable = typeof timelines;

export const timelines = {
  ppArcticThickness: new TimelineModel(
    'Arctic - Daily sea ice thickness',
    '',
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_map_thick_LA_EN_]YYYYMMDD[.png]',
    'Arctic - Daily sea ice thickness',
    1109,
    1218,
    'Daily thickness of the arctic sea ice',
  ),
  ppArcticVolume: new TimelineModel(
    'Arctic - Sea ice volume timeseries',
    '',
    'ppArctic',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/sea/CICE_curve_thick_LA_EN_]YYYYMMDD[.png]',
    'Arctic - Sea ice volume timeseries',
    1093,
    904,
    'Timeseries of the total volume of arctic sea ice',
  ),
  ppGreenlandSmb: new TimelineModel(
    'Greenland - Surface mass balance',
    '',
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_day_EN_]YYYYMMDD[.png]',
    'Greenland - Surface mass balance',
    678,
    1063,
    'Daily surface mass balance of the Greenland ice sheet',
  ),
  ppGreenlandCumSmb: new TimelineModel(
    'Greenland - Cumulated surface mass balance',
    '',
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_map_LA_acc_EN_]YYYYMMDD[.png]',
    'Greenland - Cumulated surface mass balance',
    679,
    1063,
    'Cumulated surface mass balance of the Greenland ice sheet',
  ),
  ppGreenlandSmbTs: new TimelineModel(
    'Greenland - Surface mass balance timeseries',
    '',
    'ppGreenland',
    'ice',
    '[http://polarportal.dk/fileadmin/polarportal/surface/SMB_curves_LA_EN_]YYYYMMDD[.png]',
    'Greenland - Surface mass balance timeseries',
    846,
    1080,
    'Timeseries of the surface mass balance of the Greenland ice sheet',
  ),
  crSst: new TimelineModel(
    'World - Sea surface temperature',
    '',
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sst/world-wt3/]YYYY[/sst_world-wt3_]YYYY[_d]DOY[.png]',
    'World - Sea surface temperature',
    1100,
    759,
    "Daily surface temperature of the world's oceans",
  ),
  crSstAnom: new TimelineModel(
    'World - Sea surface temperature anomaly',
    '',
    'crSst',
    'oceans',
    '[https://climatereanalyzer.org/clim/sst_daily/maps/sstanom/world-wt3/]YYYY[/sstanom_world-wt3_]YYYY[_d]DOY[.png]',
    'World - Sea surface temperature anomaly',
    1100,
    764,
    "Daily surface temperature anomaly of the world's oceans (compared to 1971-2000 baseline)",
  ),
  crT2: new TimelineModel(
    'World - Air temperature at 2 meters',
    '',
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2/world-wt/]YYYY[/t2_world-wt_]YYYY[_d]DOY[.png]',
    'World - Air temperature at 2 meters',
    1024,
    742,
    'Daily worldwide air temperature at 2 meters of altitude',
  ),
  crT2Anom: new TimelineModel(
    'World - Air temperature anomaly at 2 meters',
    '',
    'crT2',
    'atmosphere',
    '[https://climatereanalyzer.org/clim/t2_daily/clim_frames/t2anom/world-wt/]YYYY[/t2anom_world-wt_]YYYY[_d]DOY[.png]',
    'World - Air temperature at 2 meters',
    1024,
    741,
    'Daily worldwide air temperature anomaly at 2 meters of altitude (compared to 1971-2000 baseline)',
  ),
};
