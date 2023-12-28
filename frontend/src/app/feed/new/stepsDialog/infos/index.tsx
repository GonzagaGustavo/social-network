import { Checkbox, Flex } from '@radix-ui/themes'
import Input from './input'
import useUpload from '../../context/upload'
import { useEffect, useState } from 'react'

export default function InfosVideo() {
  const { video } = useUpload()
  const [placeholder, setPlaceholder] = useState('')

  useEffect(() => {
    if (video) {
      const name = video.name.split('.')
      name.pop()
      setPlaceholder(name.join())
    }
  }, [])

  return (
    <div className="flex h-full w-full justify-center">
      <div className="w-[80%] py-7">
        <Input label="Title" placeholder={placeholder} />
        <Flex gap="2" className="items-center">
          <Checkbox checked={false} /> Manter titulo original do video
        </Flex>
      </div>
    </div>
  )
}
