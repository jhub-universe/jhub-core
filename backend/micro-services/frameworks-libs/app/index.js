'use strict'

const routes = require('./routes')
const database = require('./database')
const bigbang = require('@italojs/bigbang-rest')
const LibService = require('./services/lib')
const FrameworkService = require('./services/framework')

/**
 * Application setup.
 * @param  {Object} api Express instance.
 */
module.exports = bigbang((api) => {
  const { repositories } = database.factory()

  const frameworkService = new FrameworkService(repositories.framework)
  const libService = new LibService(repositories.lib)

  api.get('/frameworks', routes.framework.findAll.factory(frameworkService))
  api.get('/libs', routes.lib.findAll.factory(libService))
  
})
