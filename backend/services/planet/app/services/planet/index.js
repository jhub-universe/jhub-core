'use strict'

const Error = require('./errors/error')
const Validator = require('email-validator')
const NotFoundError = require('./errors/not-found-error')
const MissingProperty = require('./errors/missing-property-error')
const InvalidEmailError = require('./errors/invalid-email-error')

const DEFAULT_PAGINATION_LIMIT = 50
class PlanetService {
  /**
   * @param {Object}  storage    Storages instances.
   * @param {Object}  repository Repositories instances.
   */
  constructor (storage, repository) {
    this.$storage = storage
    this.$repository = repository
  }

  /**
   * Creates a new planet.
   * @param  {Object} provider planet object
   * @return {Object}          created object
   */
  async create (provider) {
    // TODO: Apply validation
    return this.$storage.create(provider)
  }

  /**
   * search planet.
   * @param  {Object} filter filter to search a planet
   * @return {Object}
   */
  async search (params) {
    const {
      name = null,
      needGPU = null,
      description = null,
      frameworks = [],
      libs = [],
      filter = null,
      offset = 0,
      limit = DEFAULT_PAGINATION_LIMIT
    } = params

    const regexParam = (filter !== null) ? new RegExp(filter, 'i') : null

    const query = cleanDeep({
      'name': name ? nickName : null,
      'needGPU': needGPU ? needGPU : null,
      'description': description ? description : null,
      'frameworks': frameworks ? { $in: frameworks } : null,
      'libs': libs ? { $in: libs } : null,
      $or: filter ? [
        { 'name': regexParam },
        { 'needGPU': regexParam },
        { 'description': regexParam }
      ] : null
    })

    query.deletedAt = null

    const profiles = await this.$repository.search(query, parseInt(offset), parseInt(limit))

    const count = profiles.length

    profiles.range = {
      from: offset,
      to: offset + count
    }

    return providers
  }
}

module.exports = PlanetService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
module.exports.MissingProperty = MissingProperty
module.exports.InvalidEmailError = InvalidEmailError
