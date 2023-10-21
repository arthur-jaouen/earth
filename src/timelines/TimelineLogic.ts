import dayjs from 'dayjs'
import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Dispatch, State } from '../app/Store'
import { get, put } from '../lib/Db'
import { PictureModel } from '../pictures/PictureModel'
import { setPicturePending } from '../pictures/PictureSlice'
import { TimelineModel } from './TimelineModel'
import {
  TimelineState,
  setTimelineError,
  setTimelineLoading,
  setTimelineOffset,
  setTimelineSuccess,
} from './TimelineSlice'

export function useTimeline(
  timeline: TimelineModel,
): TimelineState & { picture?: PictureModel; changeOffset: (offset: number) => void } {
  const dispatch = useDispatch<Dispatch>()
  const { state, latest, offset } = useSelector((state: State) => state.timelines[timeline.id])

  useEffect(() => {
    if (state === 'pending') {
      dispatch(loadTimeline(timeline))
    }
  }, [dispatch, state, timeline])

  const picture = useMemo(
    () => (latest ? timeline.getPictureModel(timeline.getDate(latest, offset || 0)) : undefined),
    [timeline, latest, offset],
  )

  const changeOffset = useCallback(
    (offset: number) => dispatch(loadTimelinePicture(timeline, offset)),
    [dispatch, timeline],
  )

  return { state, latest, offset, picture, changeOffset }
}

export function loadTimeline(timeline: TimelineModel) {
  return async (dispatch: Dispatch): Promise<void> => {
    const latest = await cachedTimeline(timeline)

    if (latest) {
      dispatch(setPicturePending({ id: timeline.getPictureId(latest) }))
    }

    await dispatch(refreshTimeline(timeline, latest))
  }
}

export function refreshTimeline(timeline: TimelineModel, cachedLatest?: string) {
  return async (dispatch: Dispatch): Promise<void> => {
    try {
      dispatch(setTimelineLoading({ id: timeline.id, latest: cachedLatest, offset: 0 }))

      const latest = await fetchTimeline(timeline, cachedLatest)

      if (!cachedLatest) {
        dispatch(setPicturePending({ id: timeline.getPictureId(latest) }))
      }

      dispatch(setTimelineSuccess({ id: timeline.id, latest, offset: 0 }))
    } catch (error) {
      console.error(error)

      dispatch(setTimelineError({ id: timeline.id, error }))
    }
  }
}

export function loadTimelinePicture(timeline: TimelineModel, offset: number) {
  return async (dispatch: Dispatch, getState: () => State) => {
    const { latest } = getState().timelines[timeline.id]

    const date = timeline.getDate(latest!, offset)
    const pictureId = timeline.getPictureId(date)
    const picture = getState().pictures[pictureId]

    if (!picture) {
      dispatch(setPicturePending({ id: pictureId }))
    }

    dispatch(setTimelineOffset({ id: timeline.id, offset }))
  }
}

export async function cachedTimeline(timeline: TimelineModel): Promise<string | undefined> {
  const cached = await get<{ template: string; latest: string }>('timelines', timeline.id)

  if (!cached || cached.template !== timeline.template) {
    return
  }

  return cached.latest
}

export async function fetchTimeline(
  timeline: TimelineModel,
  cachedLatest?: string,
): Promise<string> {
  const start = dayjs().startOf(timeline.unit).toISOString()

  for (let count = 0; count < timeline.tries; count++) {
    try {
      const date = timeline.getDate(start, -count)

      if (date === cachedLatest) {
        return date
      }

      const response = await fetch(timeline.getPictureUrl(date), { method: 'HEAD' })

      if (response.status === 200) {
        setTimeout(() =>
          put('timelines', timeline.id, { template: timeline.template, latest: date }),
        )

        return date
      }
    } catch (error) {
      // Nothing, just try next date
    }
  }

  throw Error(`Unable to load timeline at ${timeline.template}`)
}
