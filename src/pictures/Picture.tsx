import { FunctionComponent } from 'react'
import { Img } from '../lib/Img'
import { Link } from '../lib/Link'
import { usePicture } from './PictureLogic'
import { PictureModel } from './PictureModel'

export type PictureProps = {
  picture: PictureModel
  loading?: boolean
}

export const Picture: FunctionComponent<PictureProps> = ({ picture }) => {
  const { state, blob } = usePicture(picture)

  return (
    <Img className="picture" state={state} url={blob} aspectRatio={picture.aspectRatio}>
      <legend>
        <Link href={picture.original || picture.url}>Original image</Link> {picture.legend}
      </legend>
    </Img>
  )
}
