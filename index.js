const dotenv = require("dotenv")
const express = require("express")

// Import utilities
const redisUtil = require("./utils/redisUtil")
const weatherUtil = require("./utils/weatherApiUtil")

// Set up .env file
dotenv.config()

// Set up port
const PORT = process.env.PORT || 3000

// Set up Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Set up middleware for caching and retrieving alert data
app.get("/alerts/active", redisUtil.cacheData, weatherUtil.getAlertData)

// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})