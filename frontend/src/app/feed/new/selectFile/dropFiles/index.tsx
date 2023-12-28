'use client'

import React, { useEffect, useRef } from 'react'
import styles from '../selectFile.module.scss'
import CropDialog from './cropDialog'
import VideoDialog from './videoDialog'

export default function DropFiles() {
  const inputFileRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (file) return

    function drop(e: DragEvent) {
      e.preventDefault()
      const file = e.dataTransfer?.files[0]

      console.log('oi')
      if (!file) return

      const imagesSupported = [
        'image/jpeg',
        'image/png',
        'image/tiff',
        'image/webp',
        'image/svg+xml',
        'application/pdf',
        'video/mp4'
      ]

      if (!imagesSupported.find((type) => type === file.type)) return

      setFile(file)
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
  }, [file])

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (!e.target.files) return
    const file = e.target.files[0]

    if (!file) return

    const imagesSupported = [
      'image/jpeg',
      'image/png',
      'image/tiff',
      'image/webp',
      'image/svg+xml',
      'application/pdf',
      'video/mp4'
    ]

    if (!imagesSupported.find((type) => type === file.type)) return
    setFile(file)
  }

  return (
    <>
      {/* <CropDialog
        file={file}
        setFile={setFile}
        open={file && file.type.substring(0, 5) === 'image' ? true : undefined}
        setCropped={setCropped}
      /> */}
      <VideoDialog
        open={file && file.type.substring(0, 5) === 'video' ? true : undefined}
        setFile={setFile}
        setThumb={setThumb}
        thumb={thumb}
        setCropped={setCropped}
      />
      <input
        style={{ display: 'none' }}
        type="file"
        ref={inputFileRef}
        onChange={(e) => handleChange(e)}
      />
      <button
        className={styles.uploadButton}
        onClick={() => inputFileRef.current?.click()}
      >
        Selecionar arquivo
      </button>
    </>
  )
}
