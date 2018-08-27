'use strict'

const proxy = require('@mantris/proxy')

const factory = ({ url, timeout }) => {
  return proxy({
    to: url,
    at: '/:example',
    timeout
  })
}

module.exports = { factory }
