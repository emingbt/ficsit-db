import {
  serial,
  text,
  pgEnum,
  pgTable,
  uniqueIndex,
  timestamp
} from 'drizzle-orm/pg-core'
import { InferInsertModel } from 'drizzle-orm'
import { avatarEnum, colorEnum, roleEnum } from './enums'

export const Pioneer = pgTable('Pioneer', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  avatar: avatarEnum('avatar').default('pioneer').notNull(),
  color: colorEnum('color').default('gray').notNull(),
  kindeId: text('kinde_id').notNull(),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (pioneer) => {
  return {
    uniqueIdx: uniqueIndex('unique_idx').on(pioneer.name, pioneer.email)
  }
})

export const ApiAccessToken = pgTable('ApiAccessToken', {
  id: serial('id').primaryKey(),
  accessToken: text('access_token').notNull(),
  expiresAt: timestamp('expires_at').notNull()
})

export type Pioneer = InferInsertModel<typeof Pioneer>
export type ApiAccessToken = InferInsertModel<typeof ApiAccessToken>