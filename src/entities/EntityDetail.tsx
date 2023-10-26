import { FunctionComponent } from 'react'
import { Source } from '../sources/Source'
import { Sources } from '../sources/SourceTable'
import { Entity } from './Entity'
import { EntityModel } from './EntityModel'
import { Entities, getEntityData } from './EntityTable'

import './EntityDetail.scss'

export type EntityDetailProps = {
  entity: EntityModel
}

export const EntityDetail: FunctionComponent<EntityDetailProps> = ({ entity }) => {
  const { title, subtitle, source } = getEntityData(entity)

  return (
    <div className="entity-detail">
      <h1>{title}</h1>
      <h3>
        {subtitle ? subtitle + ' - ' : null}
        <Source source={Sources[source]} />
      </h3>
      <Entity entity={Entities[entity.id]} />
    </div>
  )
}
