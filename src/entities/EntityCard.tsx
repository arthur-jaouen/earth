import { FunctionComponent } from 'react'
import { Card, CardSubtitle, CardTitle } from '../lib/Card'
import { Link } from '../lib/Link'
import { Source } from '../sources/Source'
import { Sources } from '../sources/SourceTable'
import { Entity } from './Entity'
import { Entities, EntityData } from './EntityTable'

export type EntityCardProps = {
  entity: EntityData
}

export const EntityCard: FunctionComponent<EntityCardProps> = ({ entity }) => (
  <Card>
    <CardTitle>
      <Link href={`#${entity.category}/${entity.id}`}>{entity.title}</Link>
    </CardTitle>
    <CardSubtitle>
      {entity.subtitle ? entity.subtitle + ' - ' : null}
      <Source source={Sources[entity.source]} />
    </CardSubtitle>
    <Entity entity={Entities[entity.id]} />
  </Card>
)
