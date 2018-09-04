'use strict'

/**
 * Repositories
 * ============
 */
const FrameworkRepository = require('./repositories/framework')
const LibRepository = require('./repositories/lib')


/**
 * Initiates everything related to database usage such as connection, models and
 * repositories if necessary.
 */
const factory = () => {

  const repositories = {
    framework: new FrameworkRepository(),
    lib: new LibRepository()
  }

  return { repositories }
}

module.exports =  { factory }