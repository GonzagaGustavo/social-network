import Header from '@/app/components/header'
import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '../api/auth/[...nextauth]/route'

export const metadata = {
  title: { default: 'SociNex', template: '%s - SociNex' }
}

export default async function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  const session = await getServerSession(authOptions)

  if (!session) redirect('/login')

  return (
    <>
      <header>
        <Header />
      </header>
      {children}
    </>
  )
}
