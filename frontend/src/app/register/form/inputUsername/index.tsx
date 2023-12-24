'use client'

import React, { useEffect, useState } from 'react'
import styles from '../form.module.scss'
import { ErrorMessage, Field, useFormikContext } from 'formik'
import { api } from '@/utils/constants'

export default function InputUsername() {
  const { errors, setErrors } = useFormikContext()
  const [username, setUsername] = useState('')

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (username) {
        fetch(api + `/user/verify/username/${username}`).then((res) => {
          res.json().then((json) => {
            if (json.exists) {
              setErrors({
                ...errors,
                username: 'Esse username já existe!'
              })
            } else {
              console.log('user não existe')
              setErrors({
                ...errors,
                username: null
              })
            }
          })
        })
      }
    }, 3000)

    return () => clearTimeout(timeout)
    // eslint-disable-next-line
  }, [username]);

  return (
    <div className={styles.inputWrapper}>
      <label>Username</label>
      <Field
        className="input"
        type="text"
        name="username"
        onKeyUp={(e: any) => setUsername(e.target.value)}
        onBlur={(e: any) => setUsername(e.target.value)}
      />
      <ErrorMessage name="username" component="div" />
    </div>
  )
}
