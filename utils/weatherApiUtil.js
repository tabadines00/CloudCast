const axios = require("axios")
const redisUtil = require("./redisUtil")

// GET from National Weather Service API
async function fetchWeatherAPI(area) {
    console.log(`Fetching alerts from ${area}`)
    const response = await axios.get(`https://api.weather.gov/alerts/active?area=${area}`)
    return response.data
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
        await redisUtil.redisClient.set(area, JSON.stringify(results), expiration)
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

module.exports = {
    fetchWeatherAPI,
    getAlertData
}