const dotenv = require("dotenv")
const app = require("./server/app")

const redisUtil = require("./models/redisUtil")
redisUtil.initClient()

// Set up .env file
dotenv.config()

// Set up port
const port = process.env.PORT || 3000

// Start the server
app.listen(port, () => {
    console.log("Server listening on port " + port)
})