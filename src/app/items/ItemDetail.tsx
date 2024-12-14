import { FunctionComponent } from 'react'
import { useMedia, useSourceItem } from '../../model'
import { EntityProps } from '../../ui'
import { SourceLink } from '../sources/SourceLink'
import { ItemContent } from './ItemContent'

import './ItemDetail.scss'

export const ItemDetail: FunctionComponent<EntityProps> = ({ entity }) => {
  const media = useMedia(entity)
  const source = useSourceItem(entity)

  return (
    <div className="entity-detail">
      <h1>{media?.name}</h1>
      <h3>
        {media?.description ? media?.description + ' - ' : null}
        {source ? <SourceLink entity={source?.sourceEntity} /> : null}
      </h3>
      <ItemContent entity={entity} />
    </div>
  )
}
