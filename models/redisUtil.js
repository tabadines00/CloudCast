const redis = require("redis")

const dotenv = require("dotenv")

// Set up .env file
dotenv.config()

// Set default port and host values
let redis_port = 6379
let redis_host = "localhost"
let redis_expiration = process.env.REDIS_CACHE_EX || 60

// Only use env file if it provides complete Redis connection information
if(process.env.REDIS_PORT && process.env.REDIS_HOST) {
    redis_port = process.env.REDIS_PORT
    redis_host = process.env.REDIS_HOST
    console.log("Getting Redis information from env file...")
}

// Create Redis Client to interface with Redis
let redisClient

async function initClient() {
    if(!redisClient) {
        console.log(`Connecting to Redis at ${redis_host}:${redis_port}`)
        // Attempt to connect to localhost on port 6379 by default
        redisClient = redis.createClient({
            port: redis_port,
            host: redis_host,
            enable_offline_queue: false
        })
        redisClient.on("error", (error) => {
            console.error(error.toString())
        })
        await redisClient.connect()
        console.log(`Connected to Redis at ${redis_host}:${redis_port}`)
    }
    return true 
}

async function quit() {
    return await redisClient.disconnect()
}

// Public function to check if Redis is ready and connected
function isConnected() {
    return redisClient.isReady && redisClient
}

// Public function to set key/value pair in Redis Cache with expiration
async function set(key, value) {
    let expiration = {
        EX: redis_expiration,
        NX: true
    }
    await redisClient.set(key, JSON.stringify(value), expiration)
}

// Public function to get value from Redis Cache by key
async function get(key) {
    return await redisClient.get(key)
}

// Export redisClient to access redis from the model layer
module.exports = {
    set,
    get,
    initClient,
    quit,
    isConnected
}