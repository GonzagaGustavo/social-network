'use client'

import useForm from '../../context/form'

export default function Uploading() {
  const { canvasRef } = useForm()

  return (
    <div className="h-full w-full">
      <canvas ref={canvasRef}></canvas>
    </div>
  )
}
