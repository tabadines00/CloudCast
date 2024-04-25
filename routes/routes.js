const express = require("express")
const router = express.Router()

// Import Controllers
const controller = require("../controllers/weatherApiController")

// Active Alerts Route
router.get("/alerts/active", controller.get)

module.exports = router