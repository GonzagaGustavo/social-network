'use client'

import { useEffect, useRef, useState } from 'react'
import useUpload from '../../context/upload'
import { BsImages } from 'react-icons/bs'
import PreviewThumb from './previewThumb'

const formatsSupported = [
  'image/jpeg',
  'image/png',
  'image/tiff',
  'image/webp',
  'image/svg+xml',
  'application/pdf'
]

export default function ThumbStep() {
  const { thumb, setThumb } = useUpload()
  const inputRef = useRef<HTMLInputElement | null>(null)
  const containerDivRef = useRef<HTMLInputElement | null>(null)
  const [alreadyHadThumb, setAlreadyHadThumb] = useState(false)

  useEffect(() => {
    function drop(e: DragEvent) {
      e.preventDefault()
      const file = e.dataTransfer?.files[0]

      if (!file) return

      if (!formatsSupported.find((type) => type === file.type)) return

      setAlreadyHadThumb(true)
      setThumb(file)
    }

    containerDivRef.current?.addEventListener('drop', drop)
    containerDivRef.current?.addEventListener('dragover', (e) =>
      e.preventDefault()
    )

    return () => {
      containerDivRef.current?.removeEventListener('drop', drop)
      containerDivRef.current?.removeEventListener('dragover', (e) =>
        e.preventDefault()
      )
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (!file) return

    if (!formatsSupported.find((type) => type === file.type)) return

    setAlreadyHadThumb(true)
    setThumb(file)
  }

  return (
    <div
      ref={containerDivRef}
      className="flex h-full w-full flex-col items-center justify-around"
    >
      <div className="h-[200px] w-auto">
        <PreviewThumb />
        {thumb ? null : <BsImages style={{ height: '100%', width: '100%' }} />}
      </div>

      <div className="text-center">
        <h1 className="text-3xl font-bold">
          Selecione uma imagem para thumb do video
        </h1>
        {alreadyHadThumb ? (
          <>
            <h2 className="mt-2 text-xl font-semibold">
              Não se esqueça de fazer o upload de uma imagem 16:9
            </h2>
            <p className="font-medium">
              Caso o contrário a imagem poderá perder qualidade ou ficar
              distorcida
            </p>
          </>
        ) : null}
      </div>

      <input
        ref={inputRef}
        accept={formatsSupported.join(', ')}
        type="file"
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
