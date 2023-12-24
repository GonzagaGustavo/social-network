import React from 'react'
import Like from './like'
import DesLikes from './deslike'
import { Post } from '@/types/api'

type Props = {
  post: Post
}

export default function Actions({ post }: Props) {
  return (
    <div className="flex w-[97%] justify-between">
      <div>{post.autor.name}</div>

      <div className="flex h-full items-center">
        <Like />
        <span className="skewed flex h-5/6 select-none items-center justify-center bg-gray-300">
          |
        </span>
        <DesLikes />
      </div>
    </div>
  )
}
