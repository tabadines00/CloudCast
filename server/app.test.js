const request = require("supertest")
const app = require("./app")

const redisUtil = require("../models/redisUtil")

// Integration testing to test components of the API
// Please start the redis-container Docker Image before running the tests

describe("GET request to route '/alerts/active'", () => {
    describe("Given Redis client successfully connected", () => {
        // Initialize the Redis Client for caching tests
        beforeAll(async () => {
            await redisUtil.initClient()
        })

        describe("Given a valid input ('CA')", () => {
        
            test("should respond with a 200 status code and 'fromCache' field exists", async () => {
                const response = await request(app).get("/alerts/active").query({ area: "CA"})
    
                // Expect 200 response code
                expect(response.statusCode).toBe(200)
                // Expect response output of the right shape
                expect(JSON.parse(response.text)).toEqual(expect.objectContaining({
                    fromCache: expect.any(Boolean),
                    data: expect.any(Object)
                  }))
            })
        })

        describe("Given a valid input ('CA') and server retrieves data from cache", () => {
        
            test("should respond with a 200 status code and 'fromCache' field is true", async () => {
                const response = await request(app).get("/alerts/active").query({ area: "CA"})
    
                // Expect 200 response code
                expect(response.statusCode).toBe(200)
                expect(JSON.parse(response.text).fromCache).toEqual(true)
            })
        })
    
        describe("Given an invalid input ('California')", () => {
            
            test("should respond with a 400 status code", async () => {
                const response = await request(app).get("/alerts/active").query({ area: "California"})
                
                // Expect a 400 response code
                expect(response.statusCode).toBe(400)
            })
        })

        // Closing the connection to Redis
        afterAll(done => {
            redisUtil.quit()
            done()
        })
    })

    describe("Given Redis client failed to connect", () => {
        describe("Given a valid input ('WA')", () => {

            test("should respond with a 500 status code", async () => {
                const response = await request(app).get("/alerts/active").query({ area: "WA"})
    
                // Expect 500 response code
                expect(response.statusCode).toBe(500)
            })
        })
    })
})

describe("GET request to any route other than /alerts/active", () => {
    describe("Given route '/' with no query", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get("/")

            // All other routes should be 404
            expect(response.statusCode).toBe(404)
        })
    })

    describe("Given route '/points' with no query", () => {
        test("should respond with a 404 status code", async () => {
            const response = await request(app).get("/points")

            // All other routes should be 404
            expect(response.statusCode).toBe(404)
        })
    })
})

