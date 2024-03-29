import { apiPost, secureApiGet } from '@/utils/api'
import NextAuth, { AuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'

type ResponseUser = {
  success: boolean
  token: string
  refreshToken: { _id: string; _expiresIn: number; _userId: number }
}
type User = { name: string; email: string; username: string }

async function login(credentials: {
  email: string
  password: string
}): Promise<any> {
  const response = await apiPost('/authentication', credentials)

  return response
}

async function refreshAccessToken(refreshToken: {
  id: string
  expiresIn: number
  userId: number
}) {
  // console.log('refresh token')

  const refresh = await apiPost('/user/refresh-token', {
    refresh_token: refreshToken.id
  })

  if (refresh.status === 200) {
    return {
      accessToken: refresh.data.token,
      id: refresh.data.refreshToken.userId,
      user: refresh.data.user,
      refreshToken: refresh.data.refreshToken
    }
  } else {
    console.error(refresh.data.message)
    return {
      err: refresh.data.message
    }
  }
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'email', type: 'email' },
        password: { label: 'password', type: 'password' }
      },
      async authorize(credentials, req) {
        // console.log('authorize')
        const response = await login(credentials!)
        if (response.status === 201) {
          throw new Error(response.data.err.password || response.data.err.email)
        }

        return response.data
      }
    })
  ],
  callbacks: {
    async jwt({ user: modifiedUser, token, session }) {
      const user: ResponseUser = modifiedUser as any

      if (user) {
        const { data: updatedUser, status } = await secureApiGet(
          '/authentication',
          user.token
        )

        if (status === 200) {
          console.log(updatedUser)
          token.user = updatedUser
        }

        token.accessToken = user.token
        token.id = user.refreshToken._userId
        token.refreshToken = user.refreshToken
      }

      // if (Date.now() < refreshToken.expiresIn * 1000) {
      //   return token;
      // }

      // return await refreshAccessToken(refreshToken);
      return token
    },
    async session({ session, token }) {
      // const refreshToken = token.refreshToken as {
      //   _id: string
      //   _expiresIn: number
      //   _userId: number
      // }

      if (token.accessToken) {
        session.accessToken = token.accessToken as string
        session.user = token.user as {
          name: string
          email: string
          username: string
        }
      }

      return session
    }
  },
  pages: {
    signIn: '/login',
    newUser: '/register'
  },
  jwt: {
    maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24 // 24 hour
  }
}

const handler = NextAuth(authOptions)

export { handler as GET, handler as POST }
