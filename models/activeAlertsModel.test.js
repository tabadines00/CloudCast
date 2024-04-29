const validateAlertInput = require("./activeAlertsModel").validateAlertInput

// Unit tests for the Active Alerts Model Layer

// To be more thorough than the integration tests, I would
// add more unit tests to the model layer in order to ensure
// the correct queries are giving the correct structured output.

// To test the model, I would add mock the get(), set(),
// and fetchActiveAlerts() functions to record when the model
// layer calls those functions. 

/*
function get(key) {} 

function set(key, value) {}

function fetchActiveAlerts(area) {}
*/

// Unit tests to check cache interactions

// Model layer can get and set in the cache
    // Given valid input ('TX')
        // should call mocked get() function
    // Given cache result is empty
        // should call mocked fetchActiveAlerts() and mocked set() functions
    // Given caching data was successful
        // should return data in the correct structure, fromCache is false

    // Given valid input ('TX')
        // should call mocked get() function
    // Given cache contains result
        // should return data in the correct structure, fromCache is true

// Unit tests to check validateAlertInput function

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

