import mongoose from 'npm:mongoose@^6.7'

const mongodbURI = Deno.env.get("MONGODB_URI")

const connectionString = mongodbURI || "mongodb://localhost:27017/deno"

// Create connect mongo db function
export const connectMongoDB = async () => {
  await mongoose.connect(connectionString)
  console.log("%cConnected to MongoDB", "color: green")
}