'use client'

import React, { useRef, useState } from 'react'
import Overlay from './overlay'
import { api } from '@/utils/constants'
import { Post } from '@/types/api'

type Props = {
  post: Post
  type: string
}

export default function Video({ type, post }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null)

  return (
    <>
      <video ref={videoRef} className="h-full w-full">
        <source src={api + `/post/video/${post.video?.v480p}`} type={type} />
      </video>

      <Overlay videoRef={videoRef} post={post} />
    </>
  )
}
