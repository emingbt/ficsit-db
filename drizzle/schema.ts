import {
  pgTable,
  serial,
  text,
  timestamp,
  index,
  uniqueIndex,
  integer,
  real,
  primaryKey
} from 'drizzle-orm/pg-core'
import { InferInsertModel } from 'drizzle-orm'
import { avatarEnum, categoryEnum, colorEnum, roleEnum, platformEnum } from './enums'

export const Pioneer = pgTable('Pioneer', {
  id: serial('id').primaryKey(),
  name: text('name').unique().notNull(),
  email: text('email').unique().notNull(),
  avatar: avatarEnum('avatar').default('pioneer').notNull(),
  color: colorEnum('color').default('gray').notNull(),
  kindeId: text('kinde_id').notNull(),
  role: roleEnum('role').default('user').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
})

export const ApiAccessToken = pgTable('ApiAccessToken', {
  id: serial('id').primaryKey(),
  accessToken: text('access_token').notNull(),
  expiresAt: timestamp('expires_at').notNull()
})

export const Blueprint = pgTable('Blueprint', {
  id: serial('id').primaryKey(),
  title: text('title').unique().notNull(),
  description: text('description'),
  images: text('images').array().notNull(),
  files: text('files').array().notNull(),
  categories: categoryEnum('category').array().notNull(),
  pioneerName: text('pioneer_name').references(() => Pioneer.name).notNull(),
  averageRating: real('average_rating').default(0).notNull(),
  downloads: integer('downloads').default(0).notNull(),
  fileSize: integer('file_size').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  videoUrl: text('video_url')
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
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (blueprintRating) => {
  return {
    blueprintIdPioneerNameIdx: uniqueIndex('blueprintId_pioneerName_idx').on(blueprintRating.blueprintId, blueprintRating.pioneerName)
  }
})

export const SocialLink = pgTable('SocialLink', {
  id: serial('id').primaryKey(),
  pioneerId: integer('pioneer_id').references(() => Pioneer.id).notNull(),
  platform: platformEnum('platform').notNull(),
  url: text('url').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (socialLink) => {
  return {
    pioneerIdIdx: index('pioneerId_idx').on(socialLink.pioneerId)
  }
})

export const BlueprintComment = pgTable('BlueprintComment', {
  id: serial('id').primaryKey(),
  blueprintId: serial('blueprint_id').references(() => Blueprint.id).notNull(),
  pioneerId: integer('pioneer_id').references(() => Pioneer.id).notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (blueprintComment) => {
  return {
    comment_blueprintIdIdx: index('comment_blueprintId_idx').on(blueprintComment.blueprintId),
    comment_pioneerIdIdx: index('comment_pioneerId_idx').on(blueprintComment.pioneerId)
  }
})

export const BlueprintPack = pgTable('BlueprintPack', {
  id: serial('id').primaryKey(),
  title: text('title').unique().notNull(),
  description: text('description'),
  images: text('images').array().notNull(),
  categories: categoryEnum('category').array().notNull(),
  pioneerName: text('pioneer_name').references(() => Pioneer.name).notNull(),
  averageRating: real('average_rating').default(0).notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull(),
  videoUrl: text('video_url')
}, (blueprintPack) => {
  return {
    blueprintPack_pioneerNameIdx: index('blueprintPack_pioneerName_idx').on(blueprintPack.pioneerName),
  }
})

export const BlueprintPackBlueprints = pgTable('BlueprintPackBlueprints', {
  blueprintPackId: serial('blueprint_pack_id').references(() => BlueprintPack.id).notNull(),
  blueprintId: serial('blueprint_id').references(() => Blueprint.id).notNull()
}, (table) => {
  return {
    pk: primaryKey({
      columns: [table.blueprintPackId, table.blueprintId],
      name: 'blueprintPackBlueprints_pk'
    })
  }
})

export const BlueprintPackRating = pgTable('BlueprintPackRating', {
  id: serial('id').primaryKey(),
  blueprintPackId: serial('blueprint_pack_id').references(() => BlueprintPack.id).notNull(),
  pioneerName: text('pioneer_name').references(() => Pioneer.name).notNull(),
  rating: integer('rating').notNull(),
  createdAt: timestamp('created_at').defaultNow().notNull(),
  updatedAt: timestamp('updated_at').defaultNow().notNull()
}, (blueprintPackRating) => {
  return {
    blueprintPackIdPioneerNameIdx: uniqueIndex('blueprintPackId_pioneerName_idx').on(blueprintPackRating.blueprintPackId, blueprintPackRating.pioneerName)
  }
})

export type Pioneer = InferInsertModel<typeof Pioneer>
export type ApiAccessToken = InferInsertModel<typeof ApiAccessToken>
export type Blueprint = InferInsertModel<typeof Blueprint>
export type BlueprintRating = InferInsertModel<typeof BlueprintRating>
export type SocialLink = InferInsertModel<typeof SocialLink>
export type BlueprintComment = InferInsertModel<typeof BlueprintComment>
export type BlueprintPack = InferInsertModel<typeof BlueprintPack>
export type BlueprintPackBlueprints = InferInsertModel<typeof BlueprintPackBlueprints>
export type BlueprintPackRating = InferInsertModel<typeof BlueprintPackRating>