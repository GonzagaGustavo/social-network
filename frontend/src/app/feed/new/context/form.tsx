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
      console.log('ref')
      canvas = fromRef
    } else {
      canvas = document.createElement('canvas').transferControlToOffscreen()
    }

    const worker144 = new Worker(
      new URL('./workers/video144.ts', import.meta.url)
    )
    const worker480 = new Worker(
      new URL('./workers/video480.ts', import.meta.url)
    )
    const worker720 = new Worker(
      new URL('./workers/video720.ts', import.meta.url)
    )
    const worker1080 = new Worker(
      new URL('./workers/video1080.ts', import.meta.url)
    )
    worker144.onmessage = (message) => {
      console.log(message)
    }
    worker480.onmessage = (message) => {
      console.log(message)
    }
    worker720.onmessage = (message) => {
      console.log(message)
    }
    worker1080.onmessage = (message) => {
      console.log(message)
    }

    worker144.postMessage({ video }, [])
    worker480.postMessage({ video }, [])
    worker720.postMessage({ video }, [])
    worker1080.postMessage({ video, canvas }, [canvas])
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
