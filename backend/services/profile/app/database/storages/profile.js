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
    const profile = pick(params, [
      'user.nickName',
      'user.name.first',
      'user.name.last',
      'user.email',
      'user.showEmail',
      'user.aboutMe',
      'user.webSite',
      'user.work',
      'user.country',
    ])
    profile.followers = []
    profile.following = []
    // TODO: create an example planet when create a new profile
    profile.planets = []
    return this.$model.create(params)
                       .then(document => document.toObject())
  }
}

module.exports =  ProfileStorage 
