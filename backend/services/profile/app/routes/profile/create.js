'use strict'

const rescue = require('express-rescue')
const { HttpError, validate } = require('@italojs/bigbang-rest')

const factory = (service) => ([
  /**
  * Validating request payload
  * ==========================
  */
  // TODO

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const result = await service.create(req.body)

    res.status(201)
       .json(result)
  }),

  /**
   * Error handler
   * =============
   */
  (err, req, res, next) => {
    // TODO
    next(err)
  }
])

module.exports = { factory }
