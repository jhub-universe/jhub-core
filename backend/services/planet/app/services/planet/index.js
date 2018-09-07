'use strict'

const Error = require('./errors/error')
const Validator = require('email-validator')
const NotFoundError = require('./errors/not-found-error')
const MissingProperty = require('./errors/missing-property-error')
const InvalidEmailError = require('./errors/invalid-email-error')

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
  async create (planet) {
    return this.$storage.create(planet)
  }

  /**
   * search planet.
   * @param  {Object} filter filter to search a planet
   * @return {Object}
   */
  async search (params) {
    return this.$repository.search(params)
  }
}

module.exports = PlanetService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
module.exports.MissingProperty = MissingProperty
module.exports.InvalidEmailError = InvalidEmailError
