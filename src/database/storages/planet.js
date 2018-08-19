'use strict'

class PlanetStorage {
  /**
   * @param {Object} model Planet model.
   */
  constructor (model) {
    this.$model = model
  }

  /**
   * Creates a new Planet
   * @param params New Planet data
   * @returns {Promise<Object>}
   */
  async create (params) {
    return this.$model.create(params)
                       .then(document => document.toObject())
  }
}

export default PlanetStorage
