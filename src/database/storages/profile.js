'use strict'

class ProfileStorage {
  /**
   * @param {Object} model Profile model.
   */
  constructor (model) {
    this.$model = model
  }

  /**
   * Creates a new Profile
   * @param params New Profile data
   * @returns {Promise<Object>}
   */
  async create (params) {
    return this.$model.create(params)
                       .then(document => document.toObject())
  }
}

export default ProfileStorage 
