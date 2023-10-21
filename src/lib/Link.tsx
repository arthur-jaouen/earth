import { AnchorHTMLAttributes, FunctionComponent } from 'react'
import { BiLinkExternal } from 'react-icons/bi'
import { Icon } from './Icon'
import { cls } from './Utils'

import './Link.scss'

export type LinkProps = AnchorHTMLAttributes<HTMLAnchorElement>

export const Link: FunctionComponent<LinkProps> = ({ className, href, children, ...props }) => {
  const isExternal = !href?.startsWith('#')

  return (
    <a
      className={cls('link', isExternal && 'link-external', className)}
      href={href}
      target={isExternal ? '_blank' : undefined}
      rel={isExternal ? 'noreferrer' : undefined}
      {...props}
    >
      {children} {isExternal ? <Icon className="link-icon" I={BiLinkExternal} /> : null}
    </a>
  )
}
