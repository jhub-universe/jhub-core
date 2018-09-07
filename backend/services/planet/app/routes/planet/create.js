'use strict'

const rescue = require('express-rescue')
const { HttpError, validate } = require('@italojs/bigbang-rest')

const factory = (service) => ([
  validate({
    type: 'object',
    properties: {
      name: {
        type: 'string'
      },
      profileId: {
        type: 'string'
      },
      jupyterNotebook: {
        type: 'object',
        properties: {
          link: {
            type: 'string'
          },
          needGPU: {
            type: 'boolean'
          },
          imageURL: {
            type: 'string'
          },
          size: {
            type: 'number'
          }
        },
        required: ['link', 'needGPU', 'size', 'imageURL']
      },
      type: {
        type: 'string',
        enum: ['private', 'public']
      },
      description: {
        type: 'string'
      },
      frameworks: {
        type: 'array',
        items: {
          type: 'string'
        }
      },
      libs: {
        type: 'array',
        items: {
          type: 'string'
        }
      }
    },
    required: [
      'name',
      'profileId',
      'jupyterNotebook',
      'type',
      'description',
      'frameworks',
      'libs'
    ]
  }),
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
