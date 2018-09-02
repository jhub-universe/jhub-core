'use strict'

const Error = require('./error')
const { format } = require('util')

const ERR_MESSAGE = 'the "%s" property is missing'

class MissingPropertyError extends Error {
  constructor (property) {
    super(format(ERR_MESSAGE, property))
  }
}

module.exports = MissingPropertyError
