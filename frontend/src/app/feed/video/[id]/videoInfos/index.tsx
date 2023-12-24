import { Post } from '@/types/api'
import { api } from '@/utils/constants'
import React from 'react'
import Video from './video'
import Actions from './actions'

type Props = {
  post: Post
}

export default async function VideoInfos({ post }: Props) {
  return (
    <div className="flex h-full w-full flex-col items-center">
      <div className="relative aspect-video h-auto w-w-video max-w-[97%] bg-black ">
        <Video post={post} type="video/mp4" />
      </div>

      <div className="mt-[5px] flex h-[50px] w-full justify-center">
        <Actions post={post} />
      </div>

      <div className="my-3 w-[97%] rounded-md bg-gray-300 p-3">
        <h1 className="text-3xl font-bold">{post.title}</h1>
        <p>{post.description}</p>
      </div>
    </div>
  )
}
