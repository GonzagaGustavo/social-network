'use client'

import clsx from 'clsx'
import useForm from '../../context/form'

export default function Uploading({ hidden }: { hidden: boolean }) {
  const { canvasRef } = useForm()

  return (
    <div
      className={clsx('flex h-full w-full justify-center', hidden && 'hidden')}
    >
      <canvas ref={canvasRef} className="aspect-video w-[80%]"></canvas>
    </div>
  )
}
