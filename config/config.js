'use strict'

const joi = require('joi')

require('dotenv-safe').load();
const envVarsSchema = joi.object({
  NODE_ENV: joi.string()
    .allow(['development', 'production', 'test', 'provision'])
    // .required(),
    .default('production'),
  PORT: joi.number()
    // .required(),
    .default('3000'),
  GOOGLE_API_KEY: joi.string()
    .required(),
  LOGGER_LEVEL: joi.string()
    .allow(['error', 'warn', 'info', 'debug'])
    .default('info'),
  LOGGER_ENABLED: joi.boolean()
    .truthy('TRUE')
    .truthy('true')
    .falsy('FALSE')
    .falsy('false')
    .default(true)
}).unknown()
  .required()

const { error, value: envVars } = joi.validate(process.env, envVarsSchema)
if (error) {
  throw new Error(`Config validation error: ${error.message}`)
}

const config = {
  env: envVars.NODE_ENV,
  isTest: envVars.NODE_ENV === 'test',
  isDevelopment: envVars.NODE_ENV === 'development',
  googleApiKey: envVars.GOOGLE_API_KEY,
  logger: {
    level: envVars.LOGGER_LEVEL,
    enabled: envVars.LOGGER_ENABLED
  },
  server: {
    port: envVars.PORT
  }
}

module.exports = config 