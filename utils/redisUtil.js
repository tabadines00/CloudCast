const redis = require("redis")

let redisClient
(async () => {
    redisClient = redis.createClient()
    redisClient.on("error", (error) => console.error(`Error: ${error}`))
    await redisClient.connect()
})()

// Middleware function to handle caching
async function cacheData(req, res, next) {
    const area = req.query.area
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

module.exports = {
    cacheData,
    redisClient
}