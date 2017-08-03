'use strict'
const swaggerJSDoc = require('swagger-jsdoc')
const swaggerTools = require('swagger-tools')

// Swagger definition
// You can set every attribute except paths and swagger
// https://github.com/swagger-api/swagger-spec/blob/master/versions/2.0.md
var swaggerDefinition = {
  info: { // API informations (required)
    title: 'Secret Service', // Title (required)
    version: '1.0.0', // Version (required)
    description: 'Secret agent is in the isolated country nearby, where exactly ?'
  },
  host: 'localhost:3000', // Host (optional)
  basePath: '/' // Base path (optional)
}

// Options for the swagger docs
var options = {
  // Import swaggerDefinitions
  swaggerDefinition,
  // Path to the API docs
  apis: ['./app/routes.js']
}

// Initialize swagger-jsdoc -> returns validated swagger spec in json format
var swaggerSpec = swaggerJSDoc(options)

const initSwaggerWith = app => {
  return new Promise((resolve, reject) => {
    // Serve swagger docs the way you like (Recommendation: swagger-tools)
    app.get('/api-docs.json', function (req, res) {
      res.setHeader('Content-Type', 'application/json')
      res.send(swaggerSpec)
    })

    // Initialize the Swagger middleware
    swaggerTools.initializeMiddleware(swaggerSpec, (middleware) => {

      // Interpret Swagger resources and attach metadata to request - must be first in swagger-tools middleware chain
      app.use(middleware.swaggerMetadata())

      // Validate Swagger requests
      app.use(middleware.swaggerValidator())

      // Route validated requests to appropriate controller
      // app.use(middleware.swaggerRouter(options))

      // Serve the Swagger documents and Swagger UI
      app.use(middleware.swaggerUi())

      resolve()
    })
  })
}
module.exports = { initSwaggerWith }
