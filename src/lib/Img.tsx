import { FunctionComponent, PropsWithChildren } from 'react'
import { cls } from './Utils'

import './Img.scss'

export type ImgProps = PropsWithChildren<{
  state: string
  url?: string
  aspectRatio: number
  className?: string
}>

export const Img: FunctionComponent<ImgProps> = ({
  state,
  url,
  aspectRatio,
  className,
  children,
}) => (
  <div className={cls('img', className)}>
    <svg style={{ aspectRatio }} stroke="currentColor" fill="transparent" strokeWidth="2">
      {state !== 'error' && url ? <image href={url} width="100%" height="100%" /> : null}

      {state === 'loading' ? (
        <g transform="translate(-16 -16)">
          <svg x="50%" y="50%">
            <path d="M 16 1 A 15 15 0 1 0 31 16">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 16 16"
                to="360 16 16"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </g>
      ) : state === 'error' ? (
        <g transform="translate(-16 -16)">
          <svg x="50%" y="50%">
            <path d="M 1 1 L 31 31 M 31 1 L 1 31" />
          </svg>
        </g>
      ) : null}
    </svg>

    {children}
  </div>
)
