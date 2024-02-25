'use client'

import { Checkbox, Flex, TextArea } from '@radix-ui/themes'
import Input from './input'
import useUpload from '../../context/upload'
import useForm from '../../context/form'
import { useEffect, useState } from 'react'
import clsx from 'clsx'

export default function InfosVideo({ hidden }: { hidden: boolean }) {
  const { video } = useUpload()
  const { title, setTile, description, setDescription } = useForm()
  const [placeholder, setPlaceholder] = useState('')
  const [checked, setChecked] = useState(false)
  const [disabledInput, setDisabledInput] = useState(false)

  useEffect(() => {
    if (video) {
      const name = video.name.split('.')
      name.pop()
      setPlaceholder(name.join())
    }
  }, [])

  function handleTitleCheckbox(checked: boolean) {
    setChecked(checked)
    if (checked) {
      setDisabledInput(true)
      setTile(placeholder)
    } else {
      setDisabledInput(false)
      setTile('')
    }
  }

  return (
    <div
      className={clsx('flex h-full w-full justify-center', hidden && 'hidden')}
    >
      <div className="w-[80%] py-7">
        <Input
          label="Title"
          placeholder={placeholder}
          value={title}
          onChange={(e: any) => setTile(e.target.value)}
          disabled={disabledInput}
        />
        <Flex gap="2" className="mb-7 items-center">
          <Checkbox
            defaultChecked={checked}
            checked={checked}
            onCheckedChange={handleTitleCheckbox}
          />{' '}
          Manter titulo original do video
        </Flex>
        <div className="mb-2 flex flex-col">
          <label className="mb-2 text-xl">Description</label>
          <TextArea
            placeholder="Enter video description..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={10}
          />
        </div>
      </div>
    </div>
  )
}
