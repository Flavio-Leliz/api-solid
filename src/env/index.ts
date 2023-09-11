import 'dotenv/config'
import { z } from 'zod'

const envShema = z.object({
  NODE_ENV: z.enum(['dev', 'test', 'production']).default('dev'),
  JWT_SECRET: z.string(),
  port: z.coerce.number().default(3333),
})

const _env = envShema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid environment variables', _env.error.format())

  throw new Error('Invalid environment variabales')
}

export const env = _env.data
