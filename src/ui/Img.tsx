import { FunctionComponent, PropsWithChildren } from 'react'
import { cls } from '../lib'

import { Err, Loading } from '../model'
import './Img.scss'

export type ImgProps = PropsWithChildren<{
  loading?: Loading
  err?: Err
  url?: string
  aspectRatio: number
  className?: string
}>

export const Img: FunctionComponent<ImgProps> = ({
  loading,
  err,
  url,
  aspectRatio,
  className,
  children,
}) => (
  <div className={cls('img', className)}>
    <svg style={{ aspectRatio }} stroke="currentColor" fill="transparent" strokeWidth="2">
      {url && !err ? <image href={url} width="100%" height="100%" /> : null}

      {loading ? (
        <g transform="translate(-32 -32)">
          <svg x="50%" y="50%">
            <defs>
              <radialGradient id="gradient">
                <stop offset="70%" stopColor="#FFFFFF66" />
                <stop offset="100%" stopColor="#FFFFFF00" />
              </radialGradient>
            </defs>
            <circle cx="32" cy="32" r="32" fill="url('#gradient')" strokeWidth="0" />
            <path d="M 32 17 A 15 15 0 1 0 47 32">
              <animateTransform
                attributeName="transform"
                attributeType="XML"
                type="rotate"
                from="0 32 32"
                to="360 32 32"
                dur="2s"
                repeatCount="indefinite"
              />
            </path>
          </svg>
        </g>
      ) : err ? (
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
