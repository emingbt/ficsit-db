import { neon } from '@neondatabase/serverless'
import { drizzle } from 'drizzle-orm/neon-http'

import * as schema from '../drizzle/schema'

const connectionString = process.env.POSTGRESQL_DATABASE_URL

if (!connectionString) {
  throw new Error('POSTGRESQL_DATABASE_URL environment variable is required')
}

const sql = neon(connectionString)
const db = drizzle(sql, { schema })

export default db