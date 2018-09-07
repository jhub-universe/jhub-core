'use strict'

const mongoose = require('mongoose')
const merge = require('lodash.merge')

/**
 * Models
 * ======
 */
const PlanetModel = require('./models/planet')

/**
 * Repositories
 * ============
 */
const PlanetRepository = require('./repositories/planet')

/**
 * Storages
 * ========
 */
const PlanetStorage = require('./storages/planet')

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
  }

  // REFAC: Send to User and Planet repository only the specific model
  const repositories = {
    planet: new PlanetRepository(models.Planet),
  }

  const storages = {
    planet: new PlanetStorage(models.Planet),
  }

  return { repositories, storages }
}

module.exports =  { factory }