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
          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="text" name="name" />
            <ErrorMessage name="name" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="text" name="username" />
            <ErrorMessage name="username" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="email" name="email" />
            <ErrorMessage name="email" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="password" name="password" />
            <ErrorMessage name="password" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field
              className={styles.input}
              type="password"
              name="repeatPassword"
            />
            <ErrorMessage name="repeatPassword" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="text" name="phone" />
            <ErrorMessage name="phone" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field
              className={styles.textArea}
              component="textArea"
              name="bio"
              rows={6}
            />
            <ErrorMessage component="div" name="bio" />
          </div>

          <div className={styles.inputWrapper}>
            <Field component="select" name="gender" className={styles.select}>
              <option value="male">Masculino</option>
              <option value="female">Feminino</option>
              <option value="prefer not to say">Prefiro não dizer</option>
            </Field>
            <ErrorMessage name="gender" component="div" />
          </div>

          <div className={styles.inputWrapper}>
            <Field className={styles.input} type="date" name="birthday" />
            <ErrorMessage name="birthday" component="div" />
          </div>

          <button type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </FormikForm>
      )}
    </Formik>
  );
}
