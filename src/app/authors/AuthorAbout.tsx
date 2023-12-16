import { FunctionComponent } from 'react'
import { useAuthorItems, useMedia, useUrl } from '../../model'
import { EntityProps, Link } from '../../ui'
import { SourceLink } from '../sources/SourceLink'

export const AuthorAbout: FunctionComponent<EntityProps> = ({ entity }) => {
  const { name, description } = useMedia(entity)!
  const { url } = useUrl(entity)!

  return (
    <>
      <h3>{name}</h3>
      <p>
        <Link href={url}>Website</Link>
      </p>
      {description ? <p>{description}</p> : null}
      {useAuthorItems()
        .filter((entry) => entry.component.authorEntity.id === entity.id)
        .map((entry) => (
          <p key={entry.entity.id}>
            <SourceLink entity={entry.entity} />
          </p>
        ))}
    </>
  )
}
