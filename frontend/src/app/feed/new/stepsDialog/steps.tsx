'use client'

import React from 'react'
import ThumbStep from './thumb'
import InfosVideo from './infos'
import Uploading from './uploading'

export default function Steps({ step }: { step: number }): React.ReactNode {
  return (
    <>
      <ThumbStep hidden={step !== 0} />
      <InfosVideo hidden={step !== 1} />
      <Uploading hidden={step !== 2} />
    </>
  )
}
