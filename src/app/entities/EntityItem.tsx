import { FunctionComponent } from 'react'
import { PictureSystem, STORE, TimelineSystem } from '../../model'
import { EntityProps } from '../../ui'
import { PictureItem } from '../pictures/PictureItem'
import { TimelineItem } from '../timelines/TimelineItem'

export const EntityItem: FunctionComponent<EntityProps> = ({ entity }) => {
  if (PictureSystem.has(entity)) {
    return <PictureItem entity={entity} />
  } else if (TimelineSystem.has(entity)) {
    return <TimelineItem entity={entity} />
  } else {
    STORE.log(entity)
    throw Error('Invalid entity type')
  }
}
