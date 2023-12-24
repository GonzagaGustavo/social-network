'use client'

import React, { useEffect, useState } from 'react'
import { TbPlayerTrackNext } from 'react-icons/tb'
import { FiPause, FiPlay, FiVolumeX } from 'react-icons/fi'
import { BiFullscreen } from 'react-icons/bi'
import { RiPictureInPicture2Line } from 'react-icons/ri'
import Config from './config'
import { Post } from '@/types/api'

type Props = {
  post: Post
  videoRef: React.RefObject<HTMLVideoElement>
}

export default function Overlay({ videoRef, post }: Props) {
  const [isPlaying, setPlaying] = useState(false)
  const [volume, setVolume] = useState(100)

  useEffect(() => {
    if (isPlaying) {
      videoRef.current?.play()
    } else {
      videoRef.current?.pause()
    }
  }, [isPlaying, videoRef])

  useEffect(() => {
    if (videoRef.current) videoRef.current.volume = volume / 100
  }, [volume, videoRef])

  return (
    <div className="absolute left-0 top-0 flex h-full w-full flex-col justify-between">
      <div
        className="h-[calc(100%-52px)] w-full"
        onClick={() => setPlaying((old) => !old)}
      ></div>

      {/* Progress Bar */}
      <div className="flex h-[52px] w-full justify-center">
        <div className="h-full w-[98%]">
          <div className="flex justify-center">
            <div className="h-[3px] w-full bg-white"></div>
          </div>
          <div className="h-[48px] w-[98%]">
            <div className="flex h-full w-full items-center justify-between">
              <div className="flex gap-3">
                {/* Play Button */}
                <div
                  className="h-7 w-7 cursor-pointer"
                  onClick={() => setPlaying((old) => !old)}
                >
                  {isPlaying ? (
                    <FiPause className="h-full w-full fill-white stroke-white" />
                  ) : (
                    <FiPlay className="h-full w-full fill-white stroke-white" />
                  )}
                </div>
                <div className="h-7 w-7">
                  <TbPlayerTrackNext className="h-full w-full fill-white stroke-white" />
                </div>
                <div
                  className="h-7 w-7"
                  onClick={() => setVolume((old) => (old ? 0 : 100))}
                >
                  <FiVolumeX className="h-full w-full fill-white stroke-white" />
                </div>

                <div className="h-7 w-7"></div>
              </div>
              <div className="flex gap-3">
                <Config post={post} videoRef={videoRef} />
                <div className="hidden h-7 w-7 hover:cursor-pointer sm:block">
                  <RiPictureInPicture2Line
                    className="h-full w-full fill-white"
                    onClick={() => videoRef.current?.requestPictureInPicture()}
                  />
                </div>
                <div
                  className="h-7 w-7 hover:cursor-pointer"
                  onClick={() => videoRef.current?.requestFullscreen()}
                >
                  <BiFullscreen className="h-full w-full fill-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
