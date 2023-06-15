"use client";

import {
  ErrorMessage,
  Field,
  Formik,
  Form as FormikForm,
  FormikHelpers,
} from "formik";
import React from "react";
import validation, { NewPostData, initialValues } from "./validation";
import Input from "./input";
import styles from "./form.module.scss";
import { secureApiPost } from "@/utils/constants";
import { useSession } from "next-auth/react";

type Props = {
  file: File;
};

export default function Form({ file }: Props) {
  const { data: session } = useSession();

  const onSubmit = async (
    values: NewPostData,
    e: FormikHelpers<NewPostData>
  ) => {
    const formData = new FormData();

    formData.append("title", values.title);
    formData.append("description", values.description);
    formData.append("file", file);

    const res = await secureApiPost("/post", formData, session?.accessToken!);

    if (res.status !== 200) {
      alert("Ocorreu um erro ao criar a publicação");

      console.log(res.data);
    } else {
      console.log(res.data);
    }

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
          <div className={styles.logo}>
            <h1>Nova publicação</h1>
          </div>

          <Input label="Título" name="title" />

          <div className={styles.textAreaWrapper}>
            <label>Descrição</label>
            <Field
              className={styles.textArea}
              component="textarea"
              name="description"
            />
            <ErrorMessage component="div" name="description" />
          </div>

          <div className={styles.buttonWrapper}>
            <button
              type="submit"
              className={styles.button}
              disabled={isSubmitting}
            >
              Publicar
            </button>
          </div>
        </FormikForm>
      )}
    </Formik>
  );
}
