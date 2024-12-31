import mongoose from "mongoose"

type ConnectionObject = {
  isConnected?: number
}

const connection: ConnectionObject = {}

async function connectDb(): Promise<void> {
  if (connection.isConnected) {
    console.log("Database is already connected")
    return
  }
  try {
    const db = await mongoose.connect(process.env.DB_URI || "")
    connection.isConnected = db.connections[0].readyState
    console.log("database connected successfully")
  } catch (error) {
    console.log("database connection failed")
    process.exit(1)
  }
}
