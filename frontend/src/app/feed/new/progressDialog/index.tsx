import React from 'react'

type Props = {
  uploading: string
}

export default function ProgressDialog({ uploading }: Props) {
  return (
    <div className="fixed flex h-screen w-screen items-center justify-center bg-dialogBg">
      <div className="h-4/5 w-4/5 bg-white"></div>
    </div>
  )
}
