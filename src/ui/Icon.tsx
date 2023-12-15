import { FunctionComponent, PropsWithChildren } from 'react'
import { IconType } from 'react-icons/lib'
import { cls } from '../lib'

import './Icon.scss'

export type IconProps = PropsWithChildren<{ className?: string; I: IconType }>

export const Icon: FunctionComponent<IconProps> = ({ className, I }) => (
  <span className={cls('icon', className)}>
    <I />
  </span>
)
