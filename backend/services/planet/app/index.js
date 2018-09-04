'use strict'

const routes = require('./routes')
const database = require('./database')
const bigbang = require('@italojs/bigbang-rest')
const PlanetService = require('./services/planet')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = bigbang((api, config) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const planetService = new PlanetService(storages.planet, repositories.planet)

  api.post('/', routes.planet.create.factory(planetService))
  api.get('/', routes.planet.search.factory(planetService))
  
})
