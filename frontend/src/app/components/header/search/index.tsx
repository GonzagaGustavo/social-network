'use client'

import { secureApiPost } from '@/utils/constants'
import { TextFieldInput, TextFieldRoot, TextFieldSlot } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import HistorySearch from './history'

export default function Search() {
  const [search, setSearch] = useState('')
  const [inputFocus, setInputFocus] = useState(false)

  const { data: session, status } = useSession()
  const router = useRouter()

  function submit() {
    if (status === 'authenticated') {
      secureApiPost('/history/search', { search }, session?.accessToken!).then(
        (res) => {
          console.log(res.data)
        }
      )

      router.push(`/search?q=${search}`)
    }
  }

  function verifyEnter(e: React.KeyboardEvent<HTMLInputElement>) {
    if (search && e.key === 'Enter') {
      submit()
    }
  }

  return (
    <div className="flex w-[calc(100%-70px)] items-center justify-end">
      <div className="relative w-2/3">
        <TextFieldRoot className="h-[40px] w-full rounded-md">
          <TextFieldSlot>
            <CiSearch style={{ height: '20px', width: '20px' }} />
          </TextFieldSlot>
          <TextFieldInput
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setInputFocus(true)}
            onBlur={() => setInputFocus(false)}
            style={{ height: '100%' }}
            onKeyDown={verifyEnter}
          />
        </TextFieldRoot>

        <HistorySearch inputFocus={inputFocus} />
      </div>
    </div>
  )
}
