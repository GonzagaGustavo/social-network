'use client'

import React from 'react'
import styles from '../login.module.scss'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Form({ children }: { children: React.ReactNode }) {
  const router = useRouter()

  async function submit(e: any) {
    e.preventDefault()
    const login = {
      email: e.target.email.value,
      password: e.target.password.value
    }

    const res = await signIn('credentials', {
      redirect: false,
      email: login.email,
      password: login.password,
      callbackUrl: '/'
    })

    console.log(res)
    if (res?.error) {
      return alert(res.error)
    }

    router.push(res?.url!)
  }

  return (
    <form autoComplete="off" onSubmit={submit} className={styles.form}>
      {children}
    </form>
  )
}
