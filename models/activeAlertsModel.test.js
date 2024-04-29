const validateAlertInput = require("./activeAlertsModel").validateAlertInput

// Unit tests for the Input Validation function

describe("Validating user input", () => {
    describe("Given valid input ('NY')", () => {
        test("should return true", () => {
            expect(validateAlertInput("NY")).toBe(true)
        })
    })

    describe("Given invalid input ('New York')", () => {
        test("should throw an InvalidInput error", () => {
            expect(() => {validateAlertInput("New York")}).toThrow("InvalidInput")
        })
    })
})