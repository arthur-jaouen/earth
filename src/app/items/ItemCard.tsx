import { FunctionComponent } from 'react'
import { useCategoryChild, useMedia, useSourceItem, useTag } from '../../model'
import { Card, CardSubtitle, CardTitle, EntityProps, Link } from '../../ui'
import { SourceLink } from '../sources/SourceLink'
import { ItemContent } from './ItemContent'

export const ItemCard: FunctionComponent<EntityProps> = ({ entity }) => {
  const media = useMedia(entity)
  const source = useSourceItem(entity)
  const tag = useTag(entity)?.tag
  const category = useCategoryChild(entity)
  const categoryTag = useTag(category!.categoryEntity)?.tag

  return (
    <Card className="entity-card">
      <CardTitle>
        <Link href={`#/${categoryTag}/${tag}`}>{media?.name}</Link>
      </CardTitle>
      <CardSubtitle>
        {media?.description}
        {media?.description && source ? ' - ' : null}
        {source ? <SourceLink entity={source?.sourceEntity} /> : null}
      </CardSubtitle>
      <ItemContent entity={entity} />
    </Card>
  )
}
