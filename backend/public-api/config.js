'use strict'

const env = require('sugar-env')

module.exports = {
  cors: {
    origin: '*',
    methods: [ 'GET', 'OPTIONS', 'PATCH', 'POST', 'PUT' ],
    allowedHeaders: [
      'accepts',
      'authorization',
      'content-type'
    ],
    exposedHeaders: [
      'content-range'
    ],
    preflightContinue: false,
    optionsSuccessStatus: 204
  }
}
