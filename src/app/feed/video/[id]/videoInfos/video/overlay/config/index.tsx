'use client'

import React, { useState } from 'react'
import { IoSettingsSharp } from 'react-icons/io5'
import Quality from './quality'
import { Post } from '@/types/api'

type Props = {
  post: Post
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function Config({ post, videoRef }: Props) {
  const [configOpen, setConfigOpen] = useState(false)
  const [qualityOpen, setQualityOpen] = useState(false)

  function closeConfig() {
    setQualityOpen(false)
    setConfigOpen(false)
  }

  return (
    <div className="relative h-7 w-7 select-none">
      <IoSettingsSharp
        className="h-full w-full fill-white transition-transform hover:cursor-pointer"
        style={{ transform: configOpen ? 'rotate(30deg)' : 'none' }}
        onClick={() => {
          setConfigOpen((old) => {
            if (old) {
              setQualityOpen(false)
              return false
            } else {
              return true
            }
          })
        }}
      />

      <div
        className="absolute top-[-20px] w-[100px] translate-y-[-100%] rounded-sm bg-zinc-800 text-white"
        style={{ display: configOpen ? 'block' : 'none' }}
      >
        <div
          className="cursor-pointer p-2 transition-all hover:bg-zinc-700"
          style={{ display: qualityOpen ? 'none' : 'block' }}
          onClick={() => setQualityOpen(true)}
        >
          Quality
        </div>

        <Quality
          open={qualityOpen}
          post={post}
          videoRef={videoRef}
          closeConfig={closeConfig}
        />
      </div>
    </div>
  )
}
