'use strict'

const { pick } = require('lodash')

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
    // const profile = pick(params, [
    //   // TODO
    // ])
    profile.followers = []
    profile.following = []
    // TODO: create an example planet
    profile.planets = []
    return this.$model.create(params)
                       .then(document => document.toObject())
  }
}

module.exports =  PlanetStorage
