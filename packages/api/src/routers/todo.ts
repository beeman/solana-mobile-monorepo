import { db } from '@solana-mobile-monorepo/db'
import { todo } from '@solana-mobile-monorepo/db/schema/todo'
import { eq } from 'drizzle-orm'
import z from 'zod'

import { authPublicProcedure } from '../index'

export const todoRouter = {
  getAll: authPublicProcedure.handler(async () => {
    return await db.select().from(todo)
  }),

  create: authPublicProcedure
    .input(z.object({ text: z.string().min(1) }))
    .handler(async ({ input }) => {
      return await db.insert(todo).values({
        text: input.text,
      })
    }),

  toggle: authPublicProcedure
    .input(z.object({ id: z.number(), completed: z.boolean() }))
    .handler(async ({ input }) => {
      return await db
        .update(todo)
        .set({ completed: input.completed })
        .where(eq(todo.id, input.id))
    }),

  delete: authPublicProcedure
    .input(z.object({ id: z.number() }))
    .handler(async ({ input }) => {
      return await db.delete(todo).where(eq(todo.id, input.id))
    }),
}
