'use client'

import { secureApiPost } from '@/utils/constants'
import { TextFieldInput, TextFieldRoot, TextFieldSlot } from '@radix-ui/themes'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'
import { CiSearch } from 'react-icons/ci'
import HistorySearch from './history'

export default function Search() {
  const [search, setSearch] = useState('')
  const [showHistory, setShowHistory] = useState(false)
  const historyRef = useRef<HTMLDivElement | null>(null)
  const inputRef = useRef<HTMLInputElement | null>(null)

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

  useEffect(() => {
    const handleClickOutside = (
      event: React.MouseEvent<Element, MouseEvent>
    ) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node) &&
        historyRef.current &&
        !historyRef.current.contains(event.target as Node)
      ) {
        setShowHistory(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside as any)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside as any)
    }
  }, [])

  return (
    <div className="flex w-[calc(100%-70px)] items-center justify-end">
      <div className="relative w-2/3">
        <TextFieldRoot className="h-[40px] w-full rounded-md">
          <TextFieldSlot>
            <CiSearch style={{ height: '20px', width: '20px' }} />
          </TextFieldSlot>
          <TextFieldInput
            ref={inputRef}
            placeholder="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            onFocus={() => setShowHistory(true)}
            style={{ height: '100%' }}
            onKeyDown={verifyEnter}
          />
        </TextFieldRoot>

        <HistorySearch
          showHistory={showHistory}
          historyRef={historyRef}
          inputRef={inputRef}
        />
      </div>
    </div>
  )
}
