import { createClient } from '@libsql/client'
import { env } from '@solana-mobile-monorepo/env/api'
import { drizzle } from 'drizzle-orm/libsql'

import * as schema from './schema'

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_AUTH_TOKEN,
})

export const db = drizzle({ client, schema })
