import dayjs from 'dayjs'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, State } from '../app/Store'
import { get, put } from '../lib/Db'
import { usePrev } from '../lib/Hooks'
import { PictureModel } from './PictureModel'
import { PictureState, setPictureError, setPictureLoading, setPictureSuccess } from './PictureSlice'

export function usePicture(picture: PictureModel): PictureState {
  const dispatch = useDispatch<Dispatch>()
  const { state, blob } = useSelector((state: State) => state.pictures[picture.id])

  useEffect(() => {
    if (picture && state === 'pending') {
      dispatch(loadPicture(picture))
    }
  }, [dispatch, state, picture])

  return { state, blob: usePrev(blob) }
}

export function loadPicture(picture: PictureModel) {
  return async (dispatch: Dispatch, getState: () => State): Promise<void> => {
    const pictureState = getState().pictures[picture.id]

    if (pictureState && pictureState.state !== 'pending') {
      return
    }

    const { valid, blob } = await cachedPicture(picture)

    if (valid) {
      dispatch(setPictureSuccess({ id: picture.id, blob }))
    } else {
      await dispatch(refreshPicture(picture, blob))
    }
  }
}

export function refreshPicture(picture: PictureModel, cachedBlob?: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(setPictureLoading({ id: picture.id, blob: cachedBlob }))

      const blob = await fetchPicture(picture)

      dispatch(setPictureSuccess({ id: picture.id, blob }))
    } catch (error) {
      console.error(error)

      dispatch(setPictureError({ id: picture.id, error }))
    }
  }
}

export async function cachedPicture(
  picture: PictureModel,
): Promise<{ valid: boolean; blob?: string }> {
  const cached = await get<{ url: string; blob: Blob; date: Date }>('pictures', picture.id)

  if (!cached || cached.url !== picture.url) {
    return { valid: false }
  }

  const blob = URL.createObjectURL(cached.blob)
  const valid = dayjs(new Date()).isBefore(dayjs(cached.date).add(picture.validity, 'second'))

  return { valid, blob }
}

export async function fetchPicture(picture: PictureModel): Promise<string> {
  const response = await fetch(picture.url)

  if (response.status !== 200) {
    throw Error(`Unable to load picture at ${picture.url}`)
  }

  const header = response.headers.get('Date')
  const date = header ? new Date(header) : new Date()
  const blob = await response.blob()

  setTimeout(() => put('pictures', picture.id, { url: picture.url, blob, date }))

  return URL.createObjectURL(blob)
}
