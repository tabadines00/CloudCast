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
(async () => {
    redisClient = redis.createClient()
    redisClient.on("error", (error) => console.error(`Error: ${error}`))
    await redisClient.connect()
})()

// GET from National Weather Service API
async function fetchWeatherAPI(area) {
    console.log(`Requested alerts from ${area}`)
    const response = await axios.get(`https://api.weather.gov/alerts/active?area=${area}`)
    return response.data
}

// Middleware function to handle caching
async function cacheData(req, res, next) {
    const area = req.query.area
    console.log(`Requested Alert Area: ${area}`)
    let results

    try {
        const cachedResults = await redisClient.get(area)
        if(cachedResults) {
            results = JSON.parse(cachedResults)
            console.log(`Alert results for ${area} have been retrieved from cache.`)
            res.send({
                fromCache: true,
                data: results,
            })

        } else {
            next()
        }
    } catch(error) {
        console.error(error)
        res.status(404)
    }
}

// Middleware function to handle request
async function getAlertData(req, res) {
    const area = req.query.area
    console.log(`Requested Alert Area: ${area}`)
    let results

    try {
        results = await fetchWeatherAPI(area)
        if(results.length === 0) {
            throw "Weather API returned an empty array"
        }

        let expiration = {
            EX: 30,
            NX: true
        }
        await redisClient.set(area, JSON.stringify(results), expiration)
        console.log(`Alert results for ${area} have been cached.`)

        res.send({
            fromCache: false,
            data: results
        })

    } catch(error) {
        console.error(error)
        res.status(404).send("Alerts not found")
    }
}

app.get("/alerts/active", cacheData, getAlertData)

// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})