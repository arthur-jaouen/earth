import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Entity, useCategoryChildren } from '../../model'
import { EntityCard } from '../entities/EntityCard'

import './CategoryItem.scss'

export const CategoryItem: FunctionComponent = () => {
  const params = useParams()
  const entity = Entity.parse(params.category!)
  const children = useCategoryChildren()

  return (
    <div className="category-item">
      {children
        .filter((entry) => entry.component.categoryEntity.id === entity.id)
        .map((entry) => (
          <EntityCard key={entry.entity.id} entity={entry.entity} />
        ))}
    </div>
  )
}
