'use strict'

const rescue = require('express-rescue')
const { HttpError } = require('@italojs/bigbang-rest')

const factory = (service) => ([

  rescue(async (req, res) => {
    const result = await service.findByNickName(req.nickName)

    res.status(200)
       .json(result)
  }),

  /**
   * Error handler
   * =============
   */
  (err, req, res, next) => {
    if (err instanceof Provider.NotFoundError) {
      return next(new HttpError(404, 'not_found', err.message))
    }
    next(err)
  }
])

module.exports = { factory }
