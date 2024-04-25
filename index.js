const dotenv = require("dotenv")
const router = require("./routes/routes")

const express = require("express")

// Set up .env file
dotenv.config()

// Set up port
const PORT = process.env.PORT || 3000

// Set up Express
const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Use the router
app.use(router)

// Start the server
app.listen(PORT, () => {
    console.log("Listening on port " + PORT)
})