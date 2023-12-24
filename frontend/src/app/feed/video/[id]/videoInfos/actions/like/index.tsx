import React from 'react'
import { BiLike } from 'react-icons/bi'

export default function Like() {
  return (
    <div className="skewed h-5/6 w-auto bg-gray-300 p-2 pr-3 hover:cursor-pointer hover:bg-gray-400">
      <BiLike className="h-full w-full" />
    </div>
  )
}
