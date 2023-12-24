import React from 'react'
import styles from './new.module.scss'
import GetContent from './getContent'

export const metadata = {
  title: 'New Post'
}

export default function NewPage() {
  return (
    <div className={styles.main}>
      <GetContent />
    </div>
  )
}
