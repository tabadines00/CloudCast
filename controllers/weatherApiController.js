const weatherUtil = require("../models/weatherApiModel")

module.exports = {
    get: (req, res) => {
        let area = req.query.area
        res.send(weatherUtil.getAlertData(area))
    }
}