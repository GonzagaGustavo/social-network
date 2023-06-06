import React from 'react'
import { Formik } from 'formik'
import validation, { initialValues } from './validation'

export default function Form() {
    const onSubmit = () => {

    }

    return (
        <Formik initialValues={initialValues} onSubmit={onSubmit} validationSchema={validation}></Formik>
    )
}
