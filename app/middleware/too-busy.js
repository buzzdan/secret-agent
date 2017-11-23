const toobusy = require('toobusy-js');

// middleware which blocks requests when we're too busy
const rejectRequestsWhenBusy = (req, res, next) => {
    if (toobusy()) {
        res.send(503, "I'm busy right now, sorry.")
    } else {
        next()
    }
}

const gracefulyShutdown = (server) => {
    process.on('SIGINT', () => {
        console.log('gracefully shutting down...')
        server.close()
        // calling .shutdown allows your process to exit normally
        toobusy.shutdown()
        process.exit()
    })
}

module.exports = { rejectRequestsWhenBusy, gracefulyShutdown };