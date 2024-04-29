# CloudCast
Condensing data from the weather.gov API with caching.

## Usage
To run this program, please first run the official Redis Docker container.
Once Redis is running, use `npm start` to start the server.
The endpoint implemented is `/alerts/active` and HTTP GET requests to this endpoint require a query parameter with a valid United States State abbreviation, such as `area=CA`for California.
Full endpoint example: `localhost:3000/alerts/active/?area=CA`
The result returned will be a data object from the National Weather Service API's `/alerts/active` endpoint, and a boolean to flag whether this object was from the local API's cache (`fromCache = true`).
Any other route will default to a 404 Not Found error.

## Testing
To run the tests, please first ensure the Redis Container is running.
To run the integration and unit tests, run `npm test`.
There are both implemented tests and tests described in comments within the test files.
