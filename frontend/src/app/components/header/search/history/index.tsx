'use client'

import { secureApiDelete, secureApiGet } from '@/utils/constants'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import React, { useEffect, useRef, useState } from 'react'

type Props = {
  showHistory: boolean
  historyRef: React.MutableRefObject<HTMLDivElement | null>
  inputRef: React.MutableRefObject<HTMLInputElement | null>
}

export default function HistorySearch({
  showHistory,
  historyRef,
  inputRef
}: Props) {
  const { data: session, status } = useSession()
  const [historys, setHistory] = useState<
    { id: string; search: string; sort: number }[]
  >([])
  const router = useRouter()

  async function removeHistory(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) {
    e.stopPropagation()
    if (status === 'authenticated') {
      const { data } = await secureApiDelete(
        `/history/search/${id}`,
        session.accessToken
      )
      if (data.success) {
        setHistory(historys.filter((history) => history.id !== id))
        inputRef.current?.focus()
      }
    }
  }

  useEffect(() => {
    async function c() {
      if (status === 'authenticated' && !historys.length && showHistory) {
        const { status, data } = await secureApiGet(
          '/history/search',
          session.accessToken
        )

        if (status === 200) {
          setHistory(data.search)
        }
      }
    }
    c()
  }, [status, showHistory])

  return (
    <div
      ref={historyRef}
      className={clsx(
        'absolute top-[120%] h-max w-full overflow-hidden rounded-md bg-slate-50 py-3 shadow-[inset_0_0_0_1px_var(--gray-a7)] dark:bg-black',
        historys.length && showHistory ? 'block' : 'hidden'
      )}
    >
      {historys.map((history) => (
        <div
          key={history.id}
          className="flex justify-between px-3 hover:bg-slate-200 dark:hover:bg-gray-700"
          onClick={() => {
            console.log(history.search)
            router.push(`/search?q=${history.search}`)
          }}
        >
          <p>{history.search}</p>
          <button
            className="text-blue-500 underline-offset-2 hover:underline"
            onClick={(e) => removeHistory(e, history.id)}
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
