import type { RouterClient } from '@orpc/server'
import { db } from '@solana-mobile-monorepo/db'
import { user } from '@solana-mobile-monorepo/db/schema/auth'
import { eq } from 'drizzle-orm'

import { authPublicProcedure, authRequiredProcedure } from '../index'
import { solanaRouter } from './solana'
import { todoRouter } from './todo'

export const appRouter = {
  healthCheck: authPublicProcedure.handler(() => {
    return 'OK'
  }),
  me: authPublicProcedure.handler(async ({ context }) => {
    if (!context.session?.user?.id) {
      return null
    }

    const [currentUser] = await db
      .select({
        email: user.email,
        id: user.id,
        image: user.image,
        name: user.name,
      })
      .from(user)
      .where(eq(user.id, context.session.user.id))
      .limit(1)

    return currentUser ?? null
  }),
  privateData: authRequiredProcedure.handler(({ context }) => {
    return {
      message: 'This is private',
      user: context.session.user,
    }
  }),
  solana: solanaRouter,
  todo: todoRouter,
}
export type AppRouter = typeof appRouter
export type AppRouterClient = RouterClient<typeof appRouter>
