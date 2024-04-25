const axios = require("axios")
const redisUtil = require("./redisUtil")

// GET from National Weather Service API
async function fetchWeatherAPI(area) {
    console.log(`Fetching alerts from ${area}`)
    const response = await axios.get(`https://api.weather.gov/alerts/active?area=${area}`)
    return response.data
}

// Middleware function to handle request
async function getAlertData(area) {
    console.log(`Requested Alert Area: ${area}`)
    let results
    let isCached = false

    try {

        // Check the cache to see if the current query is already cached
        const cachedResults = await redisUtil.redisClient.get(area)
        if(cachedResults) {
            results = JSON.parse(cachedResults)
            console.log(`Alert results for ${area} have been retrieved from cache.`)

        } else {

            // If it is not in the caache, fetch from the Weather API
            results = await fetchWeatherAPI(area)
            if(results.length === 0) {
                throw "Weather API returned an empty array"
            }

            // Cache the new results with an expiration
            let expiration = {
                EX: 30,
                NX: true
            }
            await redisUtil.redisClient.set(area, JSON.stringify(results), expiration)
            console.log(`Alert results for ${area} have been cached.`)
        }

        // Send the results to the controller
        return {
            fromCache: isCached,
            data: results
        }

    } catch(error) {
        console.error(error)
        //res.status(404).send("Alerts not found")
    }
}

module.exports = {
    getAlertData
}