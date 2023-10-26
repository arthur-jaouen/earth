import { FunctionComponent } from 'react'
import { EntityCard } from '../entities/EntityCard'
import { Entities } from '../entities/EntityTable'

import './Main.scss'

export const Main: FunctionComponent = () => (
  <main className="main">
    {Object.values(Entities).map((entity) => (
      <EntityCard key={entity.id} entity={entity} />
    ))}
  </main>
)
