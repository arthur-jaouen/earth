import { FunctionComponent } from 'react'
import { Link } from '../lib/Link'
import { SourceModel } from './SourceModel'

export type SourceProps = {
  source: SourceModel
}

export const Source: FunctionComponent<SourceProps> = ({ source }) => (
  <Link className="source" href={source.url}>
    {source.name}
  </Link>
)
