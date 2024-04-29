const axios = require("axios")
const redisUtil = require("./redisUtil")
const validStateCodes = require("./validStateCodes")

// GET from National Weather Service API
async function fetchActveAlerts(area) {
    console.log(`- Fetching active alerts from ${area}`)
    try {
        const response = await axios.get(`https://api.weather.gov/alerts/active?area=${area}`)
        return response.data
    } catch (error) {
        // Use our defined error instead
        throw new Error("ServerError")
    }
}

// Validate input from query parameters
function validateAlertInput(input) {
    // Ideally, validation will check input against a list of valid items in a database
    // In this case, state postal abbreviations are common knowledge and we will check against them here
    const stateAbbreviations = validStateCodes.stateList

    // Define the regular expression for state codes
    const stateRegex = /^[A-Z]{2}$/

    // Check if the test string matches the regular expression and is included in the list of valid state abbreviations
    if (stateRegex.test(input) && stateAbbreviations.includes(input)) {
        return true
    } else {
        throw new Error("InvalidInput")
    }
}

// Get and return requested data after checking the cache
async function getAlertData(area) {
    let results
    let isCached = false

    // Validate the user input
    if (validateAlertInput(area)) {
        console.log(`Requested Alert Area: ${area}`)
        
        // Only continue if the Redis Cache is initialized and ready
        if(redisUtil.isConnected()) {

            // Check the cache to see if the current query is already cached
            const cachedResults = await redisUtil.get(area)

            if(cachedResults) {
                results = JSON.parse(cachedResults)
                isCached = true
                console.log(`- Alert results for ${area} have been retrieved from cache.`)

            } else {

                // If it is not in the cache, fetch from the Weather API
                results = await fetchActveAlerts(area)
                if(results.length === 0) {
                    throw new Error("NotFound")
                }

                // Cache the new data in Redis
                await redisUtil.set(area, results)
                console.log(`- Alert results for ${area} have been cached.`)
            }
        } else {
            throw new Error("ServerError")
        }

        // Send the results to the controller
        return {
            fromCache: isCached,
            data: results
        }
    }
}

module.exports = {
    getAlertData
}