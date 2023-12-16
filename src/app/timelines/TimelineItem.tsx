import dayjs from 'dayjs'
import { FunctionComponent, useCallback, useEffect, useRef } from 'react'
import { Entity, get, put } from '../../lib'
import {
  Err,
  Init,
  Loading,
  Picture,
  STORE,
  Tag,
  Timeline,
  TimelinePicture,
  TimelinePictureSystem,
  TimelineState,
  useBlobUrl,
  useDim,
  useErr,
  useInit,
  useLegend,
  useLoading,
  usePicture,
  useTimelineState,
} from '../../model'
import { EntityProps, Img, Link, Range } from '../../ui'
import { loadPicture } from '../pictures/PictureItem'

import './TimelineItem.scss'

const ErrPool = STORE.pool(Err)
const InitPool = STORE.pool(Init)
const LoadingPool = STORE.pool(Loading)
const TagPool = STORE.pool(Tag)
const TimelinePicturePool = STORE.pool(TimelinePicture)
const TimelinePool = STORE.pool(Timeline)
const TimelineStatePool = STORE.pool(TimelineState)

export async function loadTimeline(entity: Entity, timeline: Timeline, tag: Tag) {
  ErrPool.remove(entity)
  InitPool.set(entity, new Init())

  const latest = await cachedTimeline(timeline, tag)

  if (latest) {
    const pictureEntity = await createTimelinePicture(entity, timeline, tag, latest)

    TimelineStatePool.set(entity, new TimelineState(pictureEntity, latest))
  }

  if (latest?.toISOString() !== dayjs().startOf(timeline.unit).toISOString()) {
    refreshTimeline(entity, timeline, tag, latest)
  }
}

export async function refreshTimeline(
  entity: Entity,
  timeline: Timeline,
  tag: Tag,
  cachedLatest?: Date,
) {
  try {
    LoadingPool.set(entity, new Loading())

    const latest = await fetchTimeline(timeline, tag, cachedLatest)

    if (latest.toISOString() !== cachedLatest?.toISOString()) {
      const pictureEntity = await createTimelinePicture(entity, timeline, tag, latest)

      TimelineStatePool.set(entity, new TimelineState(pictureEntity, latest))
    }

    LoadingPool.remove(entity)
  } catch (error) {
    console.error(error)

    LoadingPool.remove(entity)
    ErrPool.set(entity, new Err(error))
  }
}

export async function changeTimelineOffset(
  entity: Entity,
  timeline: Timeline,
  tag: Tag,
  state: TimelineState,
  offset: number,
) {
  const date = timeline.getDate(state.latest, offset)

  const entry = TimelinePicturePool.entries.find(
    ({ component }) =>
      component.timelineEntity.id === entity.id &&
      component.date.toISOString() === date.toISOString(),
  )

  const pictureEntity = entry
    ? entry.entity
    : await createTimelinePicture(entity, timeline, tag, date)

  TimelineStatePool.set(entity, new TimelineState(pictureEntity, state.latest, offset))
}

export async function createTimelinePicture(
  entity: Entity,
  timeline: Timeline,
  tag: Tag,
  date: Date,
): Promise<Entity> {
  const picture = new Picture(
    timeline.getPictureUrl(date),
    365 * 24 * 3600,
    timeline.getPictureOriginalUrl(date),
  )

  const pictureTag = new Tag(tag.tag + '_' + date.toISOString())

  const pictureEntity = TimelinePictureSystem.create(
    new TimelinePicture(entity, date),
    picture,
    pictureTag,
  )

  await loadPicture(pictureEntity, picture, pictureTag)

  return pictureEntity
}

export async function cachedTimeline(timeline: Timeline, tag: Tag): Promise<Date | undefined> {
  const cached = await get<{ template: string; latest: Date }>('timelines', tag.tag)

  if (!cached || cached.template !== timeline.template) {
    return
  }

  return cached.latest
}

export async function fetchTimeline(
  timeline: Timeline,
  tag: Tag,
  cachedLatest?: Date,
): Promise<Date> {
  const start = dayjs().startOf(timeline.unit).toDate()

  for (let count = 0; count < timeline.tries; count++) {
    try {
      const date = timeline.getDate(start, -count)

      if (date.toISOString() === cachedLatest?.toISOString()) {
        return date
      }

      const response = await fetch(timeline.getPictureUrl(date), { method: 'HEAD' })

      if (response.status === 200) {
        setTimeout(() => put('timelines', tag.tag, { template: timeline.template, latest: date }))

        return date
      }
    } catch (error) {
      // Nothing, just try next date
    }
  }

  if (cachedLatest) {
    return cachedLatest
  } else {
    throw Error(`Unable to load timeline at ${timeline.template}`)
  }
}

export const TimelineItem: FunctionComponent<EntityProps> = ({ entity }) => {
  const timelineLoading = useLoading(entity)
  const timelineErr = useErr(entity)
  const timelineInit = useInit(entity)
  const dim = useDim(entity)
  const legend = useLegend(entity)
  const timelineState = useTimelineState(entity)

  const pictureEntity = timelineState?.pictureEntity || Entity.null
  const pictureLoading = useLoading(pictureEntity)
  const pictureErr = useErr(pictureEntity)
  const picture = usePicture(pictureEntity)
  const pictureBlob = useBlobUrl(pictureEntity)?.blob

  useEffect(() => {
    if (!timelineInit) {
      loadTimeline(entity, TimelinePool.get(entity)!, TagPool.get(entity)!)
    }
  }, [entity, timelineInit])

  const changeOffset = useCallback(
    (offset: number) => {
      changeTimelineOffset(
        entity,
        TimelinePool.get(entity)!,
        TagPool.get(entity)!,
        TimelineStatePool.get(entity)!,
        offset,
      )
    },
    [entity],
  )

  const blobRef = useRef(pictureBlob)
  const blob = pictureBlob ?? blobRef.current

  useEffect(() => {
    if (pictureBlob) {
      blobRef.current = pictureBlob
    }
  }, [pictureBlob])

  return (
    <Img
      className="timeline"
      loading={timelineLoading || pictureLoading}
      err={timelineErr || pictureErr}
      url={blob}
      aspectRatio={dim!.ratio}
    >
      {picture ? (
        <legend>
          <Link href={picture.original || picture.url}>Original image</Link> {legend?.legend}
          <Range min={-30} max={0} value={timelineState?.offset || 0} onChange={changeOffset} />
        </legend>
      ) : null}
    </Img>
  )
}
