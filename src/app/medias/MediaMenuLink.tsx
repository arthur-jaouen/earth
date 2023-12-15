import { FunctionComponent } from 'react'
import { IconType } from 'react-icons/lib'
import { Entity, useMedia } from '../../model'
import { MenuLink } from '../../ui'

export type MediaMenuLinkProps = {
  entity: Entity
  I?: IconType
}

export const MediaMenuLink: FunctionComponent<MediaMenuLinkProps> = ({ entity, I }) => (
  <MenuLink href={'#/' + entity.id} I={I}>
    {useMedia(entity)!.name}
  </MenuLink>
)
