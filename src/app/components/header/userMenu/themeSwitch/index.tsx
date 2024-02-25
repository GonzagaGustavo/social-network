'use client'

import {
  ItemIndicator,
  Label,
  RadioGroup,
  RadioItem
} from '@radix-ui/react-dropdown-menu'
import { RxDotFilled } from 'react-icons/rx'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export default function ThemeSwitch() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <>
      <Label className="pl-[25px] text-xs leading-[25px] text-white">
        Theme
      </Label>
      <RadioGroup value={theme} onValueChange={setTheme}>
        <RadioItem
          className="relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-white outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-white data-[disabled]:text-mauve8 data-[highlighted]:text-primary"
          value="light"
        >
          <ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
            <RxDotFilled />
          </ItemIndicator>
          Light
        </RadioItem>

        <RadioItem
          className="relative flex h-[25px] select-none items-center rounded-[3px] px-[5px] pl-[25px] text-[13px] leading-none text-white outline-none data-[disabled]:pointer-events-none data-[highlighted]:bg-white data-[disabled]:text-mauve8 data-[highlighted]:text-primary"
          value="dark"
        >
          <ItemIndicator className="absolute left-0 inline-flex w-[25px] items-center justify-center">
            <RxDotFilled />
          </ItemIndicator>
          Dark
        </RadioItem>
      </RadioGroup>
    </>
  )
}
