import React from 'react'
import { BiDislike } from 'react-icons/bi'

export default function DesLikes() {
  return (
    <div className="skewed h-5/6 w-auto bg-gray-300 p-2 pl-3 hover:cursor-pointer hover:bg-gray-400">
      <BiDislike className="h-full w-full" />
    </div>
  )
}
