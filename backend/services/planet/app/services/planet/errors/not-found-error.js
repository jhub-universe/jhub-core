'use strict'

const Error = require('./error')
const { format } = require('util')

const ERR_MESSAGE = 'the "%s" can\'t be found by "%s" "%s" '

class NotFoundError extends Error {
  constructor (entity ,value, property) {
    super(format(ERR_MESSAGE, entity, value, property))
  }
}

module.exports = NotFoundError
