import { FunctionComponent } from 'react'
import { useMedia, useSourceItem } from '../../model'
import { EntityProps } from '../../ui'
import { SourceLink } from '../sources/SourceLink'
import { EntityItem } from './EntityItem'

import './EntityDetail.scss'

export const EntityDetail: FunctionComponent<EntityProps> = ({ entity }) => {
  const media = useMedia(entity)
  const source = useSourceItem(entity)

  return (
    <div className="entity-detail">
      <h1>{media?.name}</h1>
      <h3>
        {media?.description ? media?.description + ' - ' : null}
        {source ? <SourceLink entity={source?.sourceEntity} /> : null}
      </h3>
      <EntityItem entity={entity} />
    </div>
  )
}
