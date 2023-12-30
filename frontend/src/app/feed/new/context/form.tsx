'use client'

import React, { useState } from 'react'
import useUpload from './upload'

type ContextType = {
  title: string
  setTile: React.Dispatch<React.SetStateAction<string>>
  description: string
  setDescription: React.Dispatch<React.SetStateAction<string>>

  submit(): void
}

const FormContext = React.createContext<ContextType>({} as ContextType)

export function FormProvider({ children }: { children: React.ReactNode }) {
  const [title, setTile] = useState('')
  const [description, setDescription] = useState('')

  const { video, thumb } = useUpload()

  function submit() {
    const worker = new Worker(new URL('./video-worker.ts', import.meta.url))
    worker.onmessage = (message) => {
      console.log(message)
    }

    worker.postMessage({ video, thumb })
  }

  return (
    <FormContext.Provider
      value={{ description, setDescription, setTile, title, submit }}
    >
      {children}
    </FormContext.Provider>
  )
}

const useForm = () => React.useContext(FormContext)
export default useForm
