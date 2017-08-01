'use strict';
const logger = require('winston');

const configure = (env, level) => {
    logger.level = level;
    // logger.configure({
    //     transports: [
    //         new (logger.transports.File)({ 
    //             filename: './logs/' + env + '.log' 
    //         })
    //     ]
    // });//
}
module.exports = {configLogger: configure};