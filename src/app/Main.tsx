import { FunctionComponent } from 'react'
import { PictureSystem, TimelineSystem, useMediaEntities } from '../model'
import { EntityCard } from './entities/EntityCard'

import './Main.scss'

export const Main: FunctionComponent = () => (
  <main className="main">
    {useMediaEntities()
      .filter((entity) => PictureSystem.has(entity) || TimelineSystem.has(entity))
      .map((entity) => (
        <EntityCard key={entity.id} entity={entity} />
      ))}
  </main>
)
