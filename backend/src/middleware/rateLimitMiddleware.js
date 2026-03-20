const rateLimit = require('express-rate-limit');

const limit = rateLimit({
    max: 100,
    windowMs: 10 * 60 * 1000,
    message: "Too many request! please try again later."
})

module.exports = limit