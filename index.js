const dotenv = require("dotenv")
const router = require("./routes/routes")

const express = require("express")

// Set up .env file
dotenv.config()

// Set up port
const port = process.env.PORT || 3000

// Set up Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the router
app.use(router)

// Start the server
app.listen(port, () => {
    console.log("Server listening on port " + port)
})