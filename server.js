'use strict';

const config = require('./config/config');
const {configLogger} = require('./config/logger');
const express = require('express');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const logger = require('winston');
const routes = require('./app');

configLogger(config.env,config.logger.level)

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use(routes);


app.listen(config.server.port, function (err) {
  if (err) {
    logger.error(err)
    process.exit(1)
  }
  logger.info('Sample app is listening at', config.server.port)
})

module.exports = app;