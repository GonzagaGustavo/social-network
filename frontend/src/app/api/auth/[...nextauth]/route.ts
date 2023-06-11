import { apiPost } from "@/utils/constants";
import { AxiosResponse } from "axios";
import NextAuth, { AuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

type ResponseUser = {
  success: boolean;
  token: string;
  refreshToken: { id: string; expiresIn: number; userId: number };
  user: { name: string; email: string; username: string };
};

async function login(credentials: {
  email: string;
  password: string;
}): Promise<any> {
  return await apiPost("/user/login", credentials);
}

export const authOptions: AuthOptions = {
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      async authorize(credentials, req) {
        console.log("authorize");
        const response = await login(credentials!);

        if (response.status === 201) {
          throw new Error(
            response.data.err.password || response.data.err.email
          );
        }

        return response.data;
      },
    }),
  ],
  callbacks: {
    async jwt({ user: modifiedUser, token, session }) {
      const user: ResponseUser = modifiedUser as any;

      if (user) {
        token.accessToken = user.token;
        token.id = user.refreshToken.userId;
        token.user = user.user;
      }

      return token;
    },
    async session({ session, token }) {
      if (token.user) {
        session.user = token.user;
      }

      return session;
    },
  },
  jwt: {
    maxAge: Math.floor(Date.now() / 1000) + 60 * 60 * 24, // 24 hour
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
