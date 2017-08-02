'use strict';

const config = require('../config/config')
const { configLogger } = require('../config/logger')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const logger = require('winston')
const routes = require('./routes')
const swaggerTools = require('swagger-tools')
const swaggerJSDoc = require('swagger-jsdoc')
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

// var mongoose = require('mongoose');
// var MongoClient = require('mongodb').MongoClient;

// //DB setup
// mongoose.connect('mongodb://mongo:27017');

configLogger(config.env, config.logger.level)

logger.info('Starting Secret Service...', { config })

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(routes)

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

  // Start the server

  app.listen(config.server.port, function (err) {
    if (err) {
      logger.error(err)
      process.exit(1)
    }
    logger.info('Secret Service app is listening on port %d (http://localhost:%d)', config.server.port, config.server.port)
    logger.info('Swagger-ui is available on http://localhost:%d/docs', config.server.port)
  })
})

module.exports = app
