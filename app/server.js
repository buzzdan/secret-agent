'use strict';

const config = require('../config/config')
const { configLogger } = require('../config/logger')
const express = require('express')
const bodyParser = require('body-parser')
const helmet = require('helmet')
const logger = require('winston')
const routes = require('./routes')
const { initSwaggerWith } = require('../config/swagger')
const toobusy = require('./middleware/too-busy')

configLogger(config.env, config.logger.level)
logger.info('Starting Secret Service...', { config })

const app = express()

app.use(bodyParser.json())
app.use(helmet())
app.use(toobusy.rejectRequestsWhenBusy)
app.use(routes)

// Initialize the Swagger middleware
initSwaggerWith(app)
  .then(() => {
    // Start the server
    const server = app.listen(config.server.port, function (err) {
      if (err) {
        logger.error(err)
        process.exit(1)
      }
      logger.info('Secret Service app is listening on port %d (http://localhost:%d)', config.server.port, config.server.port)
      logger.info('Swagger-ui is available on http://localhost:%d/docs', config.server.port)
    })
    toobusy.gracefulyShutdown(server)
  })

module.exports = app
