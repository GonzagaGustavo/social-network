import { TextFieldInput } from '@radix-ui/themes'
import React from 'react'

interface Props {
  err?: string | null
  placeholder?: string
  label: string
  type?: string
  [key: string]: any
}

export default function Input({
  err,
  label,
  type,
  placeholder,
  ...rest
}: Props) {
  return (
    <div className="mb-2 flex flex-col">
      <label className="mb-2 text-xl">{label}</label>
      <TextFieldInput
        type={type ? type : 'text'}
        placeholder={placeholder}
        size="3"
        {...rest}
      />
      <div className="text-red-500">{err}</div>
    </div>
  )
}
