'use strict'

const Error = require('./error')
const { format } = require('util')

const ERR_MESSAGE = 'the "%s" number "%s" not found'

class NotFoundError extends Error {
  constructor (document, number) {
    super(format(ERR_MESSAGE, document, number))
  }
}

module.exports = NotFoundError
