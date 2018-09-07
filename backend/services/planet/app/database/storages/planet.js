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
    const planet = pick(params, [
        'name',
        'jupyterNotebook.link',
        'jupyterNotebook.size',
        'jupyterNotebook.imageURL',
        'jupyterNotebook.needGPU',
        'isPublic',
        'description',
        'frameworks',
        'libs'
      ])

    planet.staredBy = {
      users: [],
      count: 0
    }
    planet.openedBy = {
      users: [],
      count: 0
    }
    planet.views = 0
    planet.deletedAt = null
    return this.$model.create(planet)
                       .then(document => document.toObject())
  }
}

module.exports =  PlanetStorage
