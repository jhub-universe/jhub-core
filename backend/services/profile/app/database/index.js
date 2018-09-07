'use strict'

const mongoose = require('mongoose')
const merge = require('lodash.merge')

/**
 * Models
 * ======
 */
const ProfileModel = require('./models/profile')

/**
 * Repositories
 * ============
 */
const ProfileRepository = require('./repositories/profile')

/**
 * Storages
 * ========
 */
const ProfileStorage = require('./storages/profile')

/**
 * Constants
 * =========
 */
const DEFAULT_OPTIONS = {
  dbName: null,
  poolSize: 10,
  keepAlive: 120,
  reconnectTries: 30,
  bufferMaxEntries: 0,
  bufferCommands: false,
  reconnectInterval: 500,
  promiseLibrary: Promise,
  userNewUrlParser: true
}

/**
 * Initiates everything related to database usage such as connection, models and
 * repositories.
 * @param  {String} config.url     MongoDB connection string.
 * @param  {Object} config.options MongoDB Client options.
 * @return {Object}                Object containing instantiated repositories.
 */
const factory = (config) => {
  const { uri, options } = merge({ options: DEFAULT_OPTIONS }, config)
  const connection = mongoose.createConnection(uri, options)

  const models = {
    Profile: ProfileModel.factory(connection),
  }

  const repositories = {
    Profile: new ProfileRepository(models.Profile)
  }

  const storages = {
    Profile: new ProfileStorage(models.Profile)
  }

  return { repositories, storages }
}

module.exports =  { factory }
