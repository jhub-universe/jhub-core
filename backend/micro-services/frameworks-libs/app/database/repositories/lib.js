'use strict'

const data = require('../data/lib')

class LibRepository {

 /**
 * Get all libs
 * @function
 * @returns {[String]}
 */
  async findAll () {
    return data.libs
  }
}

module.exports =  LibRepository
