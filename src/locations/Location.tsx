import { FunctionComponent } from 'react'
import { LocationModel } from './LocationModel'

export type LocationProps = {
  location: LocationModel
}

export const Location: FunctionComponent<LocationProps> = ({ location }) => {
  return <>{location.title}</>
}
