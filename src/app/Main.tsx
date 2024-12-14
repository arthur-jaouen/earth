import { FunctionComponent } from 'react'
import { PictureSystem, TimelineSystem, useMediaEntities } from '../model'
import { ItemCard } from './items/ItemCard'

import './Main.scss'

export const Main: FunctionComponent = () => (
  <div className="main">
    {useMediaEntities()
      .filter((entity) => PictureSystem.has(entity) || TimelineSystem.has(entity))
      .map((entity) => (
        <ItemCard key={entity.id} entity={entity} />
      ))}
  </div>
)
