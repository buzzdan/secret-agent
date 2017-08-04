'use strict'
const winston = require('winston')

//
// Requiring `winston-logstash` will expose
// `winston.transports.Logstash`
//

const configure = (env, level) => {
  winston.level = level
  require('winston-logstash')

  winston.add(winston.transports.Logstash, {
    port: 10514,
    node_name: 'my node name',
    host: '127.0.0.1'
  })

  winston.add(winston.transports.File, {
    name: 'info-file',
    filename: './logs/' + env + '.log'
  })

  winston.log('info', 'Hello simple log!')
  winston.info('Hello log with metas', { color: 'blue' })
}
module.exports = { configLogger: configure }
