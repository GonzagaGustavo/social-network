import React from 'react'
import Image from 'next/image'
import { Antonio } from 'next/font/google'
import styles from './register.module.scss'
import Form from './form'

const antonio = Antonio({ subsets: ['latin'] })

export const metadata = {
  title: 'Register'
}

export default function RegisterPage() {
  return (
    <div className={styles.main}>
      <div className={styles.logo}>
        <Image
          src="/logo.png"
          className={styles.image}
          alt="SociNex"
          width={200}
          height={200}
        />
        <h1 className={antonio.className}>SociNex</h1>
      </div>

      <div className={styles.container}>
        <Form />
      </div>
    </div>
  )
}
