'use strict'

const mongoose = require('mongoose')
const merge = require('lodash.merge')

/**
 * Models
 * ======
 */
const PlanetModel = require('./models/planet')
const ProfileModel = require('./models/profile')

/**
 * Repositories
 * ============
 */
const PlanetRepository = require('./repositories/planet')
const ProfileRepository = require('./repositories/profile')

/**
 * Storages
 * ========
 */
const PlanetStorage = require('./storages/planet')
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
  promiseLibrary: Promise
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
    Planet: PlanetModel.factory(connection),
    Profile: ProfileModel.factory(connection),
  }

  // REFAC: Send to User and Planet repository only the specific model
  const repositories = {
    Planet: new PlanetRepository(models.Planet),
    Profile: new ProfileRepository(models.Profile)
  }

  const storages = {
    Planet: new PlanetStorage(models.Planet),
    Profile: new ProfileStorage(models.Profile)
  }

  return { repositories, storages }
}

module.exports =  { factory }