import neo4j, { Driver, Session } from 'neo4j-driver'

const uri = process.env.NEO4J_URI
const user = process.env.NEO4J_USER
const password = process.env.NEO4J_PASSWORD

if (!uri || !user || !password) {
  throw new Error('Missing Neo4j credentials')
}

const driver: Driver = neo4j.driver(
  uri,
  neo4j.auth.basic(
    user,
    password
  )
)

const executeQuery = async (query: string, params?: {}) => {
  try {
    const session: Session = driver.session({ database: 'neo4j' })
    const result = await session.executeRead(tx => tx.run(query, params))

    await session.close()
    return result.records.map(record => record.toObject())
  } catch (error) {
    console.log(error)
  }
}

export default executeQuery