'use strict'

const { pick } = require('lodash')

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
    const profile = {
      user: pick(params, [
        'nickName',
        'name.first',
        'name.last',
        'email',
        'showEmail',
        'aboutMe',
        'webSite',
        'work',
        'country',
      ]),
      followers: [],
      following: [],
      planets: []
    }
    // TODO: create an example planet when create a new profile
    return this.$model.create(profile)
                       .then(document => document.toObject())
  }
}

module.exports =  ProfileStorage 
