'use client'

import React, { createContext, useState } from 'react'

type ContextType = {
  video: File | null
  thumb: File | null
  setVideo: React.Dispatch<React.SetStateAction<File | null>>
  setThumb: React.Dispatch<React.SetStateAction<File | null>>
}

const UploadContext = createContext<ContextType>({} as ContextType)

export function UploadProvider({ children }: { children: React.ReactNode }) {
  const [video, setVideo] = useState<File | null>(null)
  const [thumb, setThumb] = useState<File | null>(null)

  return (
    <UploadContext.Provider
      value={{
        setThumb,
        setVideo,
        thumb,
        video
      }}
    >
      {children}
    </UploadContext.Provider>
  )
}

const useUpload = () => React.useContext(UploadContext)
export default useUpload
