import { FunctionComponent } from 'react'
import { IconType } from 'react-icons/lib'
import { Entity } from '../../lib'
import { useMedia, useTag } from '../../model'
import { MenuLink } from '../../ui'

export type MediaMenuLinkProps = {
  entity: Entity
  I?: IconType
}

export const MediaMenuLink: FunctionComponent<MediaMenuLinkProps> = ({ entity, I }) => {
  const tag = useTag(entity)?.tag

  return (
    <MenuLink href={'#/' + tag} I={I}>
      {useMedia(entity)!.name}
    </MenuLink>
  )
}
