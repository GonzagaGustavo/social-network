import { TextFieldInput } from '@radix-ui/themes'
import React from 'react'

type Props = {
  err?: string | null
  placeholder?: string
  label: string
  type?: string
}

export default function Input({ err, label, type, placeholder }: Props) {
  return (
    <div className="mb-2 flex flex-col">
      <label className="mb-2 text-xl">{label}</label>
      <TextFieldInput
        type={type ? type : 'text'}
        placeholder={placeholder}
        size="3"
      />
      <div className="text-red-500">{err}</div>
    </div>
  )
}
