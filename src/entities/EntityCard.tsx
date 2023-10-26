import { FunctionComponent } from 'react'
import { Card, CardSubtitle, CardTitle } from '../lib/Card'
import { Link } from '../lib/Link'
import { Source } from '../sources/Source'
import { Sources } from '../sources/SourceTable'
import { Entity } from './Entity'
import { EntityModel } from './EntityModel'
import { Entities, getEntityData } from './EntityTable'

export type EntityCardProps = {
  entity: EntityModel
}

export const EntityCard: FunctionComponent<EntityCardProps> = ({ entity }) => {
  const { title, subtitle, category, source } = getEntityData(entity)

  return (
    <Card className="entity-card">
      <CardTitle>
        <Link href={`#${category}/${entity.id}`}>{title}</Link>
      </CardTitle>
      <CardSubtitle>
        {subtitle ? subtitle + ' - ' : null}
        <Source source={Sources[source]} />
      </CardSubtitle>
      <Entity entity={Entities[entity.id]} />
    </Card>
  )
}
