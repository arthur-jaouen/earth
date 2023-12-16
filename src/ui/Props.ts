import { PropsWithChildren } from 'react'
import { Entity } from '../lib'

export interface EntityProps extends PropsWithChildren {
  entity: Entity
}
