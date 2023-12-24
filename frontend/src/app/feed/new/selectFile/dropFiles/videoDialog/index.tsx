'use client'

import React, { useState } from 'react'
import styles from './video.module.scss'
import SelectThumb from './selectThumb'
import PreviewThumb from './previewThumb'

type Props = {
  open?: true
  setFile: React.Dispatch<React.SetStateAction<File | null>>
  setCropped: React.Dispatch<React.SetStateAction<boolean>>
  thumb: File | null
  setThumb: React.Dispatch<React.SetStateAction<File | null>>
}

export default function VideoDialog({
  open,
  setFile,
  setCropped,
  setThumb,
  thumb
}: Props) {
  function next() {
    if (thumb) setCropped(true)
  }

  return (
    <div
      style={{ display: open ? 'flex' : 'none' }}
      className={styles.dialogWrapper}
    >
      <div className={styles.dialogContent}>
        <div className={styles.loadingWrapper}>
          {thumb ? (
            <PreviewThumb thumb={thumb} setThumb={setThumb} />
          ) : (
            <SelectThumb setThumb={setThumb} />
          )}
        </div>

        <div className={styles.dialogActions}>
          <button
            className={styles.buttonBack}
            onClick={() => {
              setThumb(null)
              setFile(null)
            }}
          >
            Voltar
          </button>

          <button
            className={styles.button}
            onClick={next}
            disabled={thumb ? undefined : true}
          >
            Avançar
          </button>
        </div>
      </div>
    </div>
  )
}
