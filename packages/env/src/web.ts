import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'VITE_',
  client: {
    VITE_SERVER_URL: z.url(),
    VITE_SOLANA_AUTH_CLUSTER: z
      .enum(['devnet', 'localnet', 'mainnet', 'testnet'])
      .default('devnet'),
  },
  runtimeEnv: import.meta.env,
  emptyStringAsUndefined: true,
})
