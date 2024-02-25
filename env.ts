import { z } from 'zod'

const envSchema = z.object({
  NEXTAUTH_URL_INTERNAL: z.string(),
  NEXTAUTH_SECRET: z.string().min(0),
  NEXTAUTH_URL: z.string()
})

const env = envSchema.parse(process.env)

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
