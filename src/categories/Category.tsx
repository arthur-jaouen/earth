import { FunctionComponent } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { EntityCard } from '../entities/EntityCard'
import { Entities, getEntityData } from '../entities/EntityTable'

import './Category.scss'

export const Category: FunctionComponent = () => {
  const params = useParams()
  const id = params.category

  if (!id) {
    redirect('#')

    return null
  }

  return (
    <div className="category">
      {Object.values(Entities)
        .filter((entity) => getEntityData(entity).category === id)
        .map((entity) => (
          <EntityCard key={entity.id} entity={entity} />
        ))}
    </div>
  )
}
