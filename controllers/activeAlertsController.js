const activeAlertsModel = require("../models/activeAlertsModel")

// Interface with the model layer with activeAlertsModel
async function get(req, res, next) {
    let area = req.query.area
    try {
        let results = await activeAlertsModel.getAlertData(area)
        res.send(results)
    } catch (error) {
        //console.error(error)
        next(error)
    }
}

// Handle errors and respond to client with appropriate status codes
function errorHandler(err, req, res, next) {
    let message = err.message
    switch (message) {
        case "InvalidInput":
            console.log("400 Bad Request: Invalid Input")
            res.status(400).send("400 Bad Request: Invalid Input")
            break
        case "NotFound":
            console.log("404 Not Found")
            res.status(404).send("404 Not Found")
            break
        default:
            console.log("500 Internal Server Error")
            res.status(500).send("500 Internal Server Error")
            break
    }
}

module.exports = {
    get,
    errorHandler
}