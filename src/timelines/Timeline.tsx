import { FunctionComponent } from 'react'
import { Img } from '../lib/Img'
import { Link } from '../lib/Link'
import { Range } from '../lib/Range'
import { useTimeline } from './TimelineLogic'
import { TimelineModel } from './TimelineModel'

import './Timeline.scss'

export type TimelineProps = {
  timeline: TimelineModel
}

export const Timeline: FunctionComponent<TimelineProps> = ({ timeline }) => {
  const { state, picture, blob, offset, changeOffset } = useTimeline(timeline)

  return (
    <Img className="timeline" state={state} url={blob} aspectRatio={timeline.aspectRatio}>
      {picture ? (
        <legend>
          <Link href={picture.original || picture.url}>Original image</Link> {picture.legend}
          <Range min={-30} max={0} value={offset || 0} onChange={changeOffset} />
        </legend>
      ) : null}
    </Img>
  )
}
