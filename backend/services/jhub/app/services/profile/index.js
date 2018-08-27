'use strict'

const Error = require('./errors/error')
const NotFoundError = require('./errors/not-found-error')


class ProfileService {
  /**
   * @param {Object}  storage    Storages instances.
   * @param {Object}  repository Repositories instances.
   */
  constructor (storage, repository) {
    this.$storage = storage
    this.$repository = repository
  }

  /**
   * Creates a new profile.
   * @param  {Object} provider profile object, that will deconstructed by $storage.create method
   * @return {Object}          created object
   */
  async create (provider) {
      return this.$storage.create(provider)
  }
}

module.exports = ProfileService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
