import { FunctionComponent } from 'react'
import { Card, CardSubtitle, CardTitle } from '../lib/Card'
import { Link } from '../lib/Link'
import { Source } from '../sources/Source'
import { Sources } from '../sources/SourceTable'
import { Entity } from './Entity'
import { EntityModel } from './EntityModel'

export type EntityCardProps = {
  entity: EntityModel
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
    <Entity entity={entity} />
  </Card>
)
