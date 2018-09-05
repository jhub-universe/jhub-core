'use strict'

const routes = require('./routes')
const database = require('./database')
const bigbang = require('@italojs/bigbang-rest')
const ProfileService = require('./services/profile')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = bigbang((api, config) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const profileService = new ProfileService(storages.Profile, repositories.Profile)

  api.post('/', routes.profile.create.factory(profileService))
  api.get('/', routes.profile.search.factory(profileService))
  api.get('/:nickName', routes.profile.findByNickName.factory(profileService))
  
})
