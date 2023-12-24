'use client'

import { useState } from 'react'

export default function Search() {
  const [search, setSearch] = useState('')

  return (
    <div className="w-[100%-70px]">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>
  )
}
