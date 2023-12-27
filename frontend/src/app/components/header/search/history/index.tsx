'use client'

import { secureApiGet } from '@/utils/constants'
import clsx from 'clsx'
import { useSession } from 'next-auth/react'
import { useEffect, useState } from 'react'

type Props = {
  inputFocus: boolean
}

export default function HistorySearch({ inputFocus }: Props) {
  const { data: session, status } = useSession()
  const [historys, setHistory] = useState<{ search: string; sort: number }[]>(
    []
  )

  useEffect(() => {
    async function c() {
      if (status === 'authenticated' && !historys.length && inputFocus) {
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
  }, [status, inputFocus])

  return (
    <div
      className={clsx(
        'absolute top-[120%] h-max w-full rounded-md bg-black p-3 shadow-[inset_0_0_0_1px_var(--gray-a7)]',
        historys.length && inputFocus ? 'block' : 'hidden'
      )}
    >
      {historys.map((history) => (
        <div key={history.sort} className="flex justify-between">
          <p>{history.search}</p>
          <button className="text-blue-500 underline-offset-2 hover:underline">
            Remove
          </button>
        </div>
      ))}
    </div>
  )
}
