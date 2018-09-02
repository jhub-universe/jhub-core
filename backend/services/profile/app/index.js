'use strict'

const routes = require('./routes')
const database = require('./database')
const thanos = require('@shawee/thanos')
const ProfileService = require('./services/profile')

/**
 * Application setup.
 * @param  {Object} api                 Express instance.
 * @param  {Object} options.config      Application configs.
 */
module.exports = thanos((api, config) => {
  const { repositories, storages } = database.factory(config.mongodb)

  const profileService = new ProfileService(storages.profile, repositories.profile)

  api.post('/', routes.profile.create.factory(profileService))
  api.get('/', routes.profile.search.factory(profileService))
  api.get('/:nickName', routes.profile.findByNickName.factory(profileService))
  
})
