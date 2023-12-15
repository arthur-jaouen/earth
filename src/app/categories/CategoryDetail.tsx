import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { Entity } from '../../model'
import { EntityDetail } from '../entities/EntityDetail'

import './CategoryDetail.scss'

export const CategoryDetail: FunctionComponent = () => {
  const params = useParams()
  const entity = Entity.parse(params.id!)

  return (
    <div className="category-detail">
      <EntityDetail entity={entity} />
    </div>
  )
}
