'use strict'

class PlanetRepository {
  /**
   * @constructor
   * @param {Object} model Planet model.
   */
  constructor (model) {
    this.$model = model
  }

 // REFAC: Remove it
 /**
 * Find all planets
 * @function
 * @returns {Promise<Object>}
 */
  async findAll () {
    return this.$model.find({})
                       .lean()
  }
}

export default PlanetRepository
