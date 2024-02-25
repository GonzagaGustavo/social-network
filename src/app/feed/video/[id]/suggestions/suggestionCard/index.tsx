import { PostSuggestion } from '@/types/api'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

type Props = {
  post: PostSuggestion
}

export default async function SuggestionCard({ post }: Props) {
  return (
    <Link
      href={`/feed/video/${post.id}`}
      className="flex w-11/12 overflow-hidden rounded-md bg-gray-300 sm:w-4/5"
    >
      <Image
        src={post.video.thumb}
        alt={post.title}
        width={1600}
        height={900}
        className="aspect-video w-1/2"
      />
      <div className="flex w-1/2 flex-col justify-around pl-2">
        <h3 className="text-ellipsis whitespace-normal text-sm font-bold">
          {post.title}
        </h3>
        <div>
          <div className="text-xs text-gray-600">{post.autor.name}</div>
        </div>
      </div>
    </Link>
  )
}
