import { FunctionComponent } from 'react'
import { useParams } from 'react-router-dom'
import { useTags } from '../../model'
import { ItemDetail } from '../items/ItemDetail'

import './CategoryDetail.scss'

export const CategoryDetail: FunctionComponent = () => {
  const params = useParams()
  const entity = useTags().find((entry) => entry.component.tag === params.id!)!.entity

  return (
    <div className="category-detail">
      <ItemDetail entity={entity} />
    </div>
  )
}
