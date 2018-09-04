'use strict'

const data = require('../data/framework')

class FrameworkRepository {

 /**
 * Get all libs
 * @function
 * @returns {[String]}
 */
  async findAll () {
    console.log(data)
    return data.frameworks
  }
}

module.exports =  FrameworkRepository
