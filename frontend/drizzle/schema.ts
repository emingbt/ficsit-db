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

export const roleEnum = pgEnum('role', ['admin', 'user'])

export const Pioneer = pgTable('Pioneer', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  password: text('password').notNull(),
  role: roleEnum('role').default('user'),
  createdAt: timestamp('created_at').defaultNow()
}, (pioneer) => {
  return {
    uniqueIdx: uniqueIndex('unique_idx').on(pioneer.name, pioneer.email)
  }
})

export const Session = pgTable('Session', {
  id: serial('id').primaryKey(),
  pioneerId: integer('pioneer_id').notNull().references(() => Pioneer.id),
  expiresAt: timestamp('expires_at').notNull()
})

export type Pioneer = InferInsertModel<typeof Pioneer>
export type Session = InferInsertModel<typeof Session>