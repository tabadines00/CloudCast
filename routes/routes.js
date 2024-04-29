const express = require("express")
const router = express.Router()

// Import Controllers
const controller = require("../controllers/weatherApiController")

// Active Alerts Route and error handler
router.get("/alerts/active", controller.get)
router.use(controller.errorHandler)

// Other API Routes would go here, e.g.
// router.get("/points/", controller.get)
// router.get("/gridpoints/", controller.get)

module.exports = router