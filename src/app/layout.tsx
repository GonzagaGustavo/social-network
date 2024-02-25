import Provider from './components/provider'
import './globals.css'
import '@radix-ui/themes/styles.css'

export const metadata = {
  title: 'SociNex',
  description: 'Plataforma de compartilhamento de videos'
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-br">
      <body>
        <Provider>{children}</Provider>
      </body>
    </html>
  )
}
