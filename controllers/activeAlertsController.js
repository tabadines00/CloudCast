const activeAlertsModel = require("../models/activeAlertsModel")

// Interface with the model layer
async function get(req, res, next) {
    let area = req.query.area
    try {
        let results = await activeAlertsModel.getAlertData(area)
        res.send(results)
    } catch (error) {
        console.error(error)
        next(error)
    }
}

// Handle errors and respond to client with appropriate status codes
function errorHandler(err, req, res, next) {
    let message = err.message
    switch (message) {
        case "InvalidInput":
            res.status(400).send("400 Bad Request: Invalid Input")
            break
        case "NotFound":
            res.status(404).send("404 Not Found")
            break
        default:
            res.status(500).send("500 Internal Server Error")
            break
    }
}

module.exports = {
    get,
    errorHandler
}