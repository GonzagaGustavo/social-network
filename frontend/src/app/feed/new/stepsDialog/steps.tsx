import React from 'react'
import ThumbStep from './thumb'
import InfosVideo from './infos'

export default function getStep({ step }: { step: number }): React.ReactNode {
  switch (step) {
    case 0:
      return <ThumbStep />
    case 1:
      return <InfosVideo />
    default:
      return null
  }
}
