const router = require("../routes/routes")

const express = require("express")

// Set up Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the router
app.use(router)

module.exports = app