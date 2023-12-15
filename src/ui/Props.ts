import { PropsWithChildren } from 'react'
import { Entity } from '../model'

export interface EntityProps extends PropsWithChildren {
  entity: Entity
}
