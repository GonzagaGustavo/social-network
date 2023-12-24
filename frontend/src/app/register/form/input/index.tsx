import React from 'react'
import styles from '../form.module.scss'
import { ErrorMessage, Field } from 'formik'

type Props = {
  name: string
  label: string
  type?: string
}

export default function Input({ name, label, type }: Props) {
  return (
    <div className={styles.inputWrapper}>
      <label>{label}</label>
      <Field className="input" type={type ? type : 'text'} name={name} />
      <ErrorMessage name={name} component="div" />
    </div>
  )
}
