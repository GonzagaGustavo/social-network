'use client'

import React, { useRef, useState } from 'react'
import useUpload from './upload'

type ContextType = {
  title: string
  setTile: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>
  canvasRef: React.MutableRefObject<HTMLCanvasElement | null>

  submit(): void
}

const FormContext = React.createContext<ContextType>({} as ContextType)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [title, setTile] = useState('')
  const [description, setDescription] = useState('')
  const canvasRef = useRef<HTMLCanvasElement | null>(null)

  const { video, thumb } = useUpload()

  function submit() {
    let canvas: OffscreenCanvas
    const fromRef = canvasRef.current?.transferControlToOffscreen()
    if (typeof fromRef !== 'undefined') {
      canvas = fromRef
    } else {
      canvas = document.createElement('canvas').transferControlToOffscreen()
    }

    const worker = new Worker(new URL('./video-worker.ts', import.meta.url))
    worker.onmessage = (message) => {
      console.log(message)
    }

    worker.postMessage({ video, canvas }, [canvas])
  }

  return (
    <FormContext.Provider
      value={{ description, setDescription, setTile, title, canvasRef, submit }}
    >
      {children}
    </FormContext.Provider>
  )
}

const useForm = () => React.useContext(FormContext)
export default useForm
