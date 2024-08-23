import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  uniqueIndex,
  integer,
  real
} from 'drizzle-orm/pg-core'
import { InferInsertModel } from 'drizzle-orm'
import { avatarEnum, categoryEnum, colorEnum, roleEnum } from './enums'

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
    nameIdx: uniqueIndex('name_idx').on(pioneer.name),
    emailIdx: uniqueIndex('email_idx').on(pioneer.email)
  }
})

export const ApiAccessToken = pgTable('ApiAccessToken', {
  id: serial('id').primaryKey(),
  accessToken: text('access_token').notNull(),
  expiresAt: timestamp('expires_at').notNull()
})

export const Blueprint = pgTable('Blueprint', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description'),
  images: text('images').array().notNull(),
  files: text('files').array().notNull(),
  categories: categoryEnum('category').array().notNull(),
  pioneerName: text('pioneer_name').references(() => Pioneer.name).notNull(),
  averageRating: real('average_rating').default(0).notNull(),
  downloads: integer('downloads').default(0).notNull(),
  fileSize: integer('file_size').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (blueprint) => {
  return {
    pioneerNameIdx: index('pioneerName_idx').on(blueprint.pioneerName)
  }
})

export const BlueprintRating = pgTable('BlueprintRating', {
  id: serial('id').primaryKey(),
  blueprintId: serial('blueprint_id').references(() => Blueprint.id).notNull(),
  pioneerName: text('pioneer_name').references(() => Pioneer.name).notNull(),
  rating: integer('rating').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull()
}, (blueprintRating) => {
  return {
    blueprintIdPioneerNameIdx: uniqueIndex('blueprintId_pioneerName_idx').on(blueprintRating.blueprintId, blueprintRating.pioneerName)
  }
})

export type Pioneer = InferInsertModel<typeof Pioneer>
export type ApiAccessToken = InferInsertModel<typeof ApiAccessToken>
export type Blueprint = InferInsertModel<typeof Blueprint>
export type BlueprintRating = InferInsertModel<typeof BlueprintRating>
