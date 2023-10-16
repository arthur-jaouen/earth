import dayjs from 'dayjs';
import { addBlob, getBlob } from '../app/Db';
import { Dispatch } from '../app/Store';
import { CategoryTable } from '../categories/CategoryModel';
import { SourceTable } from '../sources/SourceModel';
import { setPictureError, setPictureLoading, setPictureSuccess } from './PictureSlice';
import { Pictures } from './Pictures';

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

  loadCached(id: string) {
    return async (dispatch: Dispatch): Promise<boolean> => {
      const cached = await getBlob(id);

      if (!cached) {
        dispatch(setPictureLoading({ id }));

        return true;
      }

      const data = URL.createObjectURL(cached.blob);
      const isValid = dayjs(new Date()).isBefore(dayjs(cached.date).add(this.validity, 'second'));

      if (!isValid) {
        dispatch(setPictureLoading({ id, data }));

        return true;
      }

      dispatch(setPictureSuccess({ id, data }));

      return false;
    };
  }

  loadData(id: string) {
    return async (dispatch: Dispatch): Promise<void> => {
      try {
        const needsLoad = await dispatch(this.loadCached(id));

        if (needsLoad) {
          const response = await fetch(this.url);
          // TODO const date = new Date(response.headers.get('Date') as string);
          const date = new Date();
          const blob = await response.blob();
          const data = URL.createObjectURL(blob);

          dispatch(setPictureSuccess({ id, data }));

          setTimeout(async () => {
            await addBlob(id, blob, date);
          });
        }
      } catch (error) {
        console.error(error);

        dispatch(setPictureError({ id, error }));
      }
    };
  }
}

export type PictureTable = typeof Pictures;
