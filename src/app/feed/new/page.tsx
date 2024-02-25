import React from 'react'
import { TbUpload } from 'react-icons/tb'
import Upload from './upload'
import { UploadProvider } from './context/upload'
import StepsDialog from './stepsDialog'
import { FormProvider } from './context/form'

export const metadata = {
  title: 'New Post'
}

export default function NewPage() {
  return (
    <div className="flex h-[calc(100vh-100px)] w-full flex-col items-center justify-center">
      <div className="flex h-2/3 flex-col justify-around">
        <div className="h-[50%] w-auto">
          <TbUpload style={{ height: '100%', width: '100%' }} />
        </div>

        <h1 className="text-4xl font-extrabold">Upload a video</h1>
      </div>

      <UploadProvider>
        <FormProvider>
          <Upload />

          <StepsDialog />
        </FormProvider>
      </UploadProvider>
    </div>
  )
}
