'use strict'

class ProfileRepository {
  /**
   * @constructor
   * @param {Object} model Profile model.
   */
  constructor (model) {
    this.$model = model
  }

// REFAC: Remove it
 /**
 * Find all profiles.
 * @function
 * @returns {Promise<Object>}
 */
  async findAll () {
    return this.$model.find({})
                       .lean()
  }
}

module.exports =  ProfileRepository
