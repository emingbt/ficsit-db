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

export const avatarEnum = pgEnum('avatar', [
  'bacon-agaric',
  'beryl-nut',
  'ficsit-coffee-cup',
  'lizard-doggo',
  'paleberry',
  'pioneer',
  'small-stinger',
  'space-giraffe-tick-penguin-whale'
])
export const colorEnum = pgEnum('color', [
  'gray',
  'purple',
  'indigo',
  'blue',
  'green',
  'yellow',
  'orange',
  'red'
])
export const roleEnum = pgEnum('role', ['admin', 'user'])

export const Pioneer = pgTable('Pioneer', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  avatar: avatarEnum('avatar').default('pioneer'),
  color: colorEnum('color').default('gray'),
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