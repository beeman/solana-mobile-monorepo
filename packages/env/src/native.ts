import { createEnv } from '@t3-oss/env-core'
import { z } from 'zod'

export const env = createEnv({
  clientPrefix: 'EXPO_PUBLIC_',
  client: {
    EXPO_PUBLIC_SERVER_URL: z.url().optional(),
    EXPO_PUBLIC_SOLANA_AUTH_CLUSTER: z
      .enum(['devnet', 'localnet', 'mainnet', 'testnet'])
      .default('devnet'),
    EXPO_PUBLIC_SOLANA_CLUSTER_URL: z
      .url()
      .default('https://api.devnet.solana.com'),
  },
  runtimeEnv: process.env,
  emptyStringAsUndefined: true,
})
