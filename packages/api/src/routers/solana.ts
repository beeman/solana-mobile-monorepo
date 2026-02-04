import { getBalance } from '@solana-mobile-stack/solana-client'
import z from 'zod'

import { publicProcedure } from '../index'
import { solanaAddressSchema } from './solana-address-schema'

export const solanaRouter = {
  getBalance: publicProcedure
    .input(z.object({ address: solanaAddressSchema }))
    .handler(async ({ input, context }) => {
      return await getBalance(context.solana, input.address)
    }),
}
