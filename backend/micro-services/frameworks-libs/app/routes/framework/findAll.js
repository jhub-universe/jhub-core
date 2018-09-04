'use strict'

const rescue = require('express-rescue')

const factory = (service) => ([

  /**
   * Request handler
   * ===============
   */
  rescue(async (req, res) => {
    const result = await service.findAll()

    res.status(200)
       .json(result)
  })
])

module.exports = { factory }
