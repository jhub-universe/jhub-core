'use strict'

const Error = require('./error')
const { format } = require('util')

const ERR_MESSAGE = 'the "%s" e-mail is invalid'

class InvalidEmailError extends Error {
  constructor (email) {
    super(format(ERR_MESSAGE, email))
  }
}

module.exports = InvalidEmailError
