'use client'

import clsx from 'clsx'
import useUpload from '../context/upload'
import Steps from './steps'
import { useState } from 'react'
import { Button } from '@radix-ui/themes'
import useForm from '../context/form'

export default function StepsDialog() {
  const { video } = useUpload()
  const { submit } = useForm()
  const [step, setStep] = useState(0)

  function handleNext() {
    if (step === 1) {
      submit()
    }
    setStep(step + 1)
  }

  function handleBack() {
    if (step === 0) return
    setStep(step - 1)
  }

  return (
    <div
      className={clsx(
        'fixed left-0 top-0 z-50 h-screen w-screen items-center justify-center bg-dialogBg',
        video ? 'flex' : 'hidden'
      )}
    >
      <div className="flex h-[80%] w-[80%] flex-col justify-between overflow-hidden rounded-md">
        <div className="h-[calc(100%-70px)] w-full bg-white dark:bg-[rgb(25,25,25)]">
          <Steps step={step} />
        </div>

        <div className="flex h-[70px] w-full justify-between bg-slate-200 px-6 py-3 dark:bg-slate-800">
          <button
            className="h-full cursor-pointer rounded border border-primary px-5 transition-all hover:bg-primary hover:text-white disabled:bg-white/10"
            disabled={step === 0}
            onClick={handleBack}
          >
            Back
          </button>
          <button
            className="h-full cursor-pointer rounded bg-primary px-5 text-white"
            onClick={handleNext}
          >
            {step === 1 ? 'Post' : 'Next'}
          </button>
        </div>
      </div>
    </div>
  )
}
