import { index, integer, sqliteTable, text } from 'drizzle-orm/sqlite-core'

import { user } from './auth'

export const todo = sqliteTable(
  'todo',
  {
    id: integer('id').primaryKey({ autoIncrement: true }),
    userId: text('user_id')
      .notNull()
      .references(() => user.id, { onDelete: 'cascade' }),
    text: text('text').notNull(),
    completed: integer('completed', { mode: 'boolean' })
      .default(false)
      .notNull(),
  },
  (table) => [index('todo_userId_idx').on(table.userId)],
)
