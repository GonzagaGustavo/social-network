'use client'

import { useEffect, useRef } from 'react'
import useUpload from '../context/upload'

const formatsSupported = ['video/mp4']

export default function Upload() {
  const inputRef = useRef<HTMLInputElement | null>(null)
  const { video, setVideo } = useUpload()

  useEffect(() => {
    if (video) return

    function drop(e: DragEvent) {
      e.preventDefault()
      const file = e.dataTransfer?.files[0]

      if (!file) return

      if (!formatsSupported.find((type) => type === file.type)) return

      setVideo(file)
    }

    document.documentElement.addEventListener('drop', drop)
    document.documentElement.addEventListener('dragover', (e) =>
      e.preventDefault()
    )

    return () => {
      document.documentElement.removeEventListener('drop', drop)
      document.documentElement.removeEventListener('dragover', (e) =>
        e.preventDefault()
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [video])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (!file) return

    if (!formatsSupported.find((type) => type === file.type)) return
    setVideo(file)
  }

  return (
    <div className="flex h-1/3 items-center">
      <input
        ref={inputRef}
        type="file"
        accept="video/mp4"
        onChange={handleChange}
        className="hidden"
      />
      <button
        className="rounded-md bg-primary px-4 py-3 text-lg font-medium text-white transition-shadow hover:shadow-lg"
        onClick={() => inputRef.current?.click()}
      >
        Select file
      </button>
    </div>
  )
}
