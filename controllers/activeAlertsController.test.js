const activeAlertsController = require("./activeAlertsController")
const errorHandler = activeAlertsController.errorHandler

// Unit Testng for the Controller Layer

// Real tests would consist of passing new Error objects to the handler
// and a mock 'res' object to test the errorHandler.
// errorHandler would call the send() and status() methods with the correct output

describe("TODO: Error Handling in Active Alerts Controller", () => {
    describe("TODO: Given InvalidInput Error", () => {
        test("should respond with a 400 status code", () => {
            expect(400).toBe(400)
        })
    })

    describe("TODO: Given NotFound Error", () => {
        test("should respond with a 404 status code", () => {
            expect(404).toBe(404)
        })
    })

    describe("TODO: Given ServerError Error", () => {
        test("should respond with a 500 status code", () => {
            expect(500).toBe(500)
        })
    })
})