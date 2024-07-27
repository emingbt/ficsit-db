import {
  serial,
  text,
  pgEnum,
  pgTable,
  uniqueIndex,
  integer,
  timestamp
} from 'drizzle-orm/pg-core'
import { InferInsertModel } from 'drizzle-orm'

const userRoles = pgEnum('role', ['admin', 'user'])

export const pioneers = pgTable('pioneers', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: userRoles('role').default('user'),
  createdAt: timestamp('created_at').defaultNow()
}, (pioneers) => {
  return {
    uniqueIdx: uniqueIndex('unique_idx').on(pioneers.name, pioneers.email)
  }
})

export const sessions = pgTable('sessions', {
  id: serial('id').primaryKey(),
  pioneerId: integer('pioneer_id').notNull().references(() => pioneers.id),
  expiresAt: timestamp('expires_at').notNull()
})

export type Pioneer = InferInsertModel<typeof pioneers>
export type Session = InferInsertModel<typeof sessions>