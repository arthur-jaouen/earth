import dayjs, { ManipulateType } from 'dayjs';
import { Dispatch, State } from '../app/Store';
import { CategoryTable } from '../categories/CategoryModel';
import { PictureModel } from '../pictures/PictureModel';
import { setPicturePending } from '../pictures/PictureSlice';
import { SourceTable } from '../sources/SourceModel';
import {
  setTimelineError,
  setTimelineLoading,
  setTimelineOffset,
  setTimelineSuccess,
} from './TimelineSlice';
import { Timelines } from './Timelines';

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

export type TimelineTable = typeof Timelines;
