import React from 'react'
import ThumbStep from './thumb'
import InfosVideo from './infos'
import Uploading from './uploading'

export default function getStep({ step }: { step: number }): React.ReactNode {
  switch (step) {
    case 0:
      return <ThumbStep />
    case 1:
      return <InfosVideo />
    case 2:
      return <Uploading />
    default:
      return null
  }
}
