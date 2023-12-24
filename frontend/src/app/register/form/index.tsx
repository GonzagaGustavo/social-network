'use client'

import React from 'react'
import {
  Formik,
  FormikHelpers,
  Form as FormikForm,
  Field,
  ErrorMessage
} from 'formik'
import validation, { RegisterData, initialValues } from './validation'
import styles from './form.module.scss'
import Input from './input'
import InputUsername from './inputUsername'
import { apiPost } from '@/utils/constants'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'

export default function Form() {
  const router = useRouter()

  const onSubmit = async (
    values: RegisterData,
    e: FormikHelpers<RegisterData>
  ) => {
    const res = await apiPost('/user', values)

    if (res.data.success) {
      const res = await signIn('credentials', {
        redirect: false,
        email: values.email,
        password: values.password,
        callbackUrl: '/'
      })

      if (res?.error) {
        return alert(res.error)
      }

      router.push(res?.url!)
    } else {
      alert(res.data.err)
    }

    e.setSubmitting(false)
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validation}
    >
      {({ isSubmitting }) => (
        <FormikForm className={styles.main}>
          <div className={styles.firstGrid}>
            <Input name="name" label="Nome" />

            <InputUsername />
          </div>

          <div className={styles.secondGrid}>
            <Input name="email" label="Email" />
          </div>

          <div className={styles.thirdGrid}>
            <Input name="password" type="password" label="Crie uma senha" />

            <Input
              name="repeatPassword"
              type="password"
              label="Repita sua senha"
            />
          </div>

          <div className={styles.fourthGrid}>
            <div className={styles.inputWrapper}>
              <label>Gênero</label>
              <Field component="select" name="gender" className={styles.select}>
                <option value="prefer not to say">Prefiro não dizer</option>
                <option value="male">Masculino</option>
                <option value="female">Feminino</option>
              </Field>
              <ErrorMessage name="gender" component="div" />
            </div>

            <Input name="birthday" type="date" label="Data de nascimento" />

            <Input name="phone" label="Telefone (opcional)" />
          </div>

          <div className={styles.fifthGrid}>
            <div className={styles.inputWrapper}>
              <label>Bio</label>
              <Field
                className={styles.textArea}
                component="textarea"
                name="bio"
              />
              <ErrorMessage component="div" name="bio" />
            </div>
          </div>

          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Registrar-se
            </button>
          </div>
        </FormikForm>
      )}
    </Formik>
  )
}
