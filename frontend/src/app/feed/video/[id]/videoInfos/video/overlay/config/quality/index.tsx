'use client'

import { Post } from '@/types/api'
import { api } from '@/utils/constants'
import React from 'react'

type Props = {
  videoRef: React.RefObject<HTMLVideoElement>
  open: boolean
  post: Post
  closeConfig(): void
}

export default function Quality({ open, post, videoRef, closeConfig }: Props) {
  function changeVideoSrc(src: string) {
    if (videoRef.current) {
      videoRef.current.src = src
      closeConfig()
    }
  }

  return (
    <div style={{ display: open ? 'block' : 'none' }}>
      {post.video?.v1080p ? (
        <div
          className="cursor-pointer p-2 transition-all hover:bg-zinc-700"
          onClick={() =>
            changeVideoSrc(api + `/post/video/${post.video?.v1080p}`)
          }
        >
          1080p
        </div>
      ) : null}

      {post.video?.v720p ? (
        <div
          className="cursor-pointer p-2 transition-all hover:bg-zinc-700"
          onClick={() =>
            changeVideoSrc(api + `/post/video/${post.video?.v720p}`)
          }
        >
          720p
        </div>
      ) : null}

      {post.video?.v480p ? (
        <div
          className="cursor-pointer p-2 transition-all hover:bg-zinc-700"
          onClick={() =>
            changeVideoSrc(api + `/post/video/${post.video?.v480p}`)
          }
        >
          480p
        </div>
      ) : null}

      {post.video?.v144p ? (
        <div
          className="cursor-pointer p-2 transition-all hover:bg-zinc-700"
          onClick={() =>
            changeVideoSrc(api + `/post/video/${post.video?.v144p}`)
          }
        >
          144p
        </div>
      ) : null}
    </div>
  )
}
