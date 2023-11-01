import { FunctionComponent } from 'react'
import { redirect, useParams } from 'react-router-dom'
import { EntityDetail } from '../entities/EntityDetail'
import { Entities } from '../entities/EntityTable'

import './CategoryDetail.scss'

export const CategoryDetail: FunctionComponent = () => {
  const params = useParams()
  const id = params.category
  const entityId = params.id

  if (!id || !entityId) {
    redirect('#')

    return null
  }

  return (
    <div className="category-detail">
      <EntityDetail entity={Entities.get(entityId)} />
    </div>
  )
}
