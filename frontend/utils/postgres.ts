import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'
import { pioneers, Pioneer } from '../drizzle/schema'

import * as schema from '../drizzle/schema'

const connectionString = process.env.POSTGRESQL_DATABASE_URL

if (!connectionString) {
  throw new Error('POSTGRESQL_DATABASE_URL environment variable is required')
}

const sql = neon(connectionString)
const db = drizzle(sql, { schema })

export const insertPioneer = async (pioneer: Pioneer) => {
  return await db.insert(pioneers).values(pioneer).returning({
    name: pioneers.name,
    email: pioneers.email
  })
}

export default db