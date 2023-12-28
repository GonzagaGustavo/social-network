'use client'

import { useEffect, useState } from 'react'
import useUpload from '../../../context/upload'
import Image from 'next/image'

export default function PreviewThumb() {
  const { thumb } = useUpload()
  const [thumbUrl, setThumbUrl] = useState('')

  useEffect(() => {
    if (thumb) setThumbUrl(URL.createObjectURL(thumb))
  }, [thumb])

  if (thumbUrl) {
    return (
      <Image
        src={thumbUrl}
        width={160}
        height={90}
        alt="video thumb"
        className="aspect-video h-full w-full"
      />
    )
  }
}
