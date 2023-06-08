"use client";

import React from "react";
import {
  Formik,
  FormikHelpers,
  Form as FormikForm,
  Field,
  ErrorMessage,
} from "formik";
import validation, { RegisterData, initialValues } from "./validation";
import styles from "./form.module.scss";
import Input from "./input";

export default function Form() {
  const onSubmit = (values: RegisterData, e: FormikHelpers<RegisterData>) => {
    alert(JSON.stringify(values, null, 2));

    e.setSubmitting(false);
  };

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

            <Input name="username" label="Username" />
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
  );
}
