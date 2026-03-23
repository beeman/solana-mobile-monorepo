import { getBalance } from '@solana-mobile-monorepo/solana-client'
import z from 'zod'

import { authPublicProcedure } from '../index'
import { solanaAddressSchema } from './solana-address-schema'

export const solanaRouter = {
  getBalance: authPublicProcedure
    .input(z.object({ address: solanaAddressSchema }))
    .handler(async ({ input, context }) => {
      return await getBalance(context.solana, input.address)
    }),
}
