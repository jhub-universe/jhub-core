'use strict'

const routes = require('./routes')
const database = require('./database')
const thanos = require('@shawee/thanos')
const planetService = require('./services/profile')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = thanos((api, config) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const planetService = new planetService(storages.planet, repositories.planet)

  api.post('/', routes.planet.create.factory(planetService))
  api.get('/', routes.planet.search.factory(planetService))
  
})
