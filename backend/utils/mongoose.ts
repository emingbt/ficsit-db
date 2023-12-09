import mongoose from 'npm:mongoose@^6.7'

const nodeEnv = Deno.env.get("NODE_ENV") || "development"
const mongodbURI = Deno.env.get("MONGODB_URI")
let connectionString = ""


// Create connect mongo db function
export const connectMongoDB = async () => {
  if (nodeEnv == "production" && mongodbURI) {
    connectionString = mongodbURI
  } else {
    connectionString = "mongodb://localhost:27017/deno"
  }

  try {
    await mongoose.connect(connectionString)
    console.log(`%cConnected to MongoDB - %c${nodeEnv}`, "color: green", `color: ${nodeEnv == "production" ? "yellow" : "green"}`)
  } catch (error) {
    console.log("%cError connecting to MongoDB", "color: red")
    console.log(error)
  }
}