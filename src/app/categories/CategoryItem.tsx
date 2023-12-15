import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { useCategoryChildren, useTags } from '../../model'
import { EntityCard } from '../entities/EntityCard'

import './CategoryItem.scss'

export const CategoryItem: FunctionComponent = () => {
  const params = useParams()
  const entity = useTags().find((entry) => entry.component.tag === params.category!)!.entity
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
