const redis = require("redis")

// Create Redis Client to interface with Redis
let redisClient
(async () => {
    // Attempt to connect to localhost on port 6379 by default
    redisClient = redis.createClient()
    redisClient.on("error", (error) => {
        console.error(error.toString())
    })
    await redisClient.connect()
})()

// Export redisClient to access redis from the model layer
module.exports = {
    redisClient
}