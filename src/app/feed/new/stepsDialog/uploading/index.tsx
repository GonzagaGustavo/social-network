import clsx from 'clsx'

export default function Uploading({ hidden }: { hidden: boolean }) {
  return (
    <div
      className={clsx(
        'flex h-full w-full items-center justify-center',
        hidden && 'hidden'
      )}
    >
      <div className="flex gap-2">
        <div className="h-5 w-5 animate-pulse rounded-full bg-primary"></div>
        <div className="h-5 w-5 animate-pulse rounded-full bg-primary"></div>
        <div className="h-5 w-5 animate-pulse rounded-full bg-primary"></div>
      </div>
    </div>
  )
}
