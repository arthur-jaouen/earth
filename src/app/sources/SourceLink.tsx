import { FunctionComponent } from 'react'
import { useMedia, useUrl } from '../../model'
import { EntityProps, Link } from '../../ui'

export const SourceLink: FunctionComponent<EntityProps> = ({ entity }) => {
  const url = useUrl(entity)!
  const media = useMedia(entity)!

  return (
    <Link className="source" href={url.url}>
      {media.name}
    </Link>
  )
}
