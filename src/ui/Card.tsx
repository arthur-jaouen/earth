import { FunctionComponent, PropsWithChildren } from 'react'

import './Card.scss'

export type CardProps = PropsWithChildren<{
  className?: string
}>

export const Card: FunctionComponent<CardProps> = ({ children }) => (
  <div className="card">{children}</div>
)

export const CardTitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h3 className="card-title">{children}</h3>
)

export const CardSubtitle: FunctionComponent<PropsWithChildren> = ({ children }) => (
  <h4 className="card-subtitle">{children}</h4>
)
