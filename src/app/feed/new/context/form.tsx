'use client'

import React, { useState } from 'react'
import useUpload from './upload'
import { api, secureApiPost } from '@/utils/api'
import { useSession } from 'next-auth/react'
import axios from 'axios'

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
  const { data, status } = useSession()

  const { video, thumb } = useUpload()

  async function submit() {
    if (status === 'authenticated' && video) {
      const formData = new FormData()
      formData.append('file', video)
      const { data: res } = await axios.put(api + '/post', formData, {
        headers: {
          Authorization: `Bearer ${data.accessToken}`
        }
      })
      console.log(res)
    }
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
