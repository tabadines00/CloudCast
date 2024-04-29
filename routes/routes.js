const express = require("express")
const router = express.Router()

// Import Controllers
const activeAlertsController = require("../controllers/activeAlertsController")

// Active Alerts Route and error handler
router.get("/alerts/active", activeAlertsController.get)
router.use(activeAlertsController.errorHandler)

// Other API Routes and error handlers would go here, e.g.
// router.get("/points/", pointsController.get)
// router.get("/gridpoints/", gridPointsController.get)

// router.use(pointsController.errorHandler)
// router.use(gridPointsController.errorHandler)

// Default response for unhandled routes are sent to 404
router.get("*", (req, res) => {
    res.status(404).send("404 Not Found")
})

module.exports = router