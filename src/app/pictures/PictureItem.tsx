import dayjs from 'dayjs'
import { FunctionComponent, useEffect } from 'react'
import { Entity, get, put } from '../../lib'
import {
  BlobUrl,
  Err,
  Init,
  Loading,
  Picture,
  STORE,
  Tag,
  useBlobUrl,
  useDim,
  useErr,
  useInit,
  useLegend,
  useLoading,
  usePicture,
} from '../../model'
import { EntityProps, Img, Link } from '../../ui'

const ErrPool = STORE.pool(Err)
const InitPool = STORE.pool(Init)
const LoadingPool = STORE.pool(Loading)
const PicturePool = STORE.pool(Picture)
const BlobUrlPool = STORE.pool(BlobUrl)
const TagPool = STORE.pool(Tag)

export async function loadPicture(entity: Entity, picture: Picture, tag: Tag) {
  ErrPool.remove(entity)
  InitPool.set(entity, new Init())

  const { valid, blob } = await cachedPicture(picture, tag)

  if (blob) {
    BlobUrlPool.set(entity, new BlobUrl(blob))
  }

  if (!valid) {
    refreshPicture(entity, picture, tag)
  }
}

export async function refreshPicture(entity: Entity, picture: Picture, tag: Tag) {
  try {
    LoadingPool.set(entity, new Loading())

    const blob = await fetchPicture(picture, tag)

    LoadingPool.remove(entity)
    BlobUrlPool.set(entity, new BlobUrl(blob))
  } catch (error) {
    console.error(error)

    LoadingPool.remove(entity)
    ErrPool.set(entity, new Err(error))
  }
}

export async function cachedPicture(
  picture: Picture,
  tag: Tag,
): Promise<{ valid: boolean; blob?: string }> {
  const cached = await get<{ url: string; blob: Blob; date: Date }>('pictures', tag.tag)

  if (!cached || cached.url !== picture.url) {
    return { valid: false }
  }

  const blob = URL.createObjectURL(cached.blob)
  const valid = dayjs(new Date()).isBefore(dayjs(cached.date).add(picture.validity, 'second'))

  return { valid, blob }
}

export async function fetchPicture(picture: Picture, tag: Tag): Promise<string> {
  const response = await fetch(picture.url)

  if (response.status !== 200) {
    throw Error(`Unable to load picture at ${picture.url}`)
  }

  const header = response.headers.get('Date')
  const date = header ? new Date(header) : new Date()
  const blob = await response.blob()
  const url = URL.createObjectURL(blob)

  put('pictures', tag.tag, { url: picture.url, blob, date })

  return url
}

export const PictureItem: FunctionComponent<EntityProps> = ({ entity }) => {
  const loading = useLoading(entity)
  const err = useErr(entity)
  const init = useInit(entity)
  const picture = usePicture(entity)
  const dim = useDim(entity)
  const legend = useLegend(entity)
  const blob = useBlobUrl(entity)

  useEffect(() => {
    if (!init) {
      loadPicture(entity, PicturePool.get(entity)!, TagPool.get(entity)!)
    }
  }, [entity, init])

  return (
    <Img className="picture" loading={loading} err={err} url={blob?.blob} aspectRatio={dim!.ratio}>
      {picture ? (
        <legend>
          <Link href={picture.original || picture.url}>Original image</Link> {legend?.legend}
        </legend>
      ) : null}
    </Img>
  )
}
