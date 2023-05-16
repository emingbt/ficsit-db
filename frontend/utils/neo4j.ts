import neo4j, { Driver, Session } from 'neo4j-driver'

const driver: Driver = neo4j.driver(
  process.env.NEO4J_URI,
  neo4j.auth.basic(
    process.env.NEO4J_USER,
    process.env.NEO4J_PASSWORD
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