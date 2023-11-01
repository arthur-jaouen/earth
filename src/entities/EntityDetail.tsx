import { FunctionComponent } from 'react'
import { Source } from '../sources/Source'
import { Sources } from '../sources/SourceTable'
import { Entity } from './Entity'
import { EntityModel } from './EntityModel'

import './EntityDetail.scss'

export type EntityDetailProps = {
  entity: EntityModel
}

export const EntityDetail: FunctionComponent<EntityDetailProps> = ({ entity }) => {
  const { title, subtitle, source } = entity.data

  return (
    <div className="entity-detail">
      <h1>{title}</h1>
      <h3>
        {subtitle ? subtitle + ' - ' : null}
        <Source source={Sources.get(source)} />
      </h3>
      <Entity entity={entity} />
    </div>
  )
}
