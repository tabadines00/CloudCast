const dotenv = require("dotenv")
const express = require("express")
const redis = require("redis")
const axios = require("axios")

// Set up .env file
dotenv.config()

// Set up port
const PORT = process.env.PORT || 3000

// Set up Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Connect to Redis
let redisClient
async function redisConnect() {
    redisClient = redis.createClient()
    redisClient.on("error", (error) => console.error(`Error: ${error}`))
    await redisClient.connect()
}
redisConnect()

// GET from National Weather Service API


// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})