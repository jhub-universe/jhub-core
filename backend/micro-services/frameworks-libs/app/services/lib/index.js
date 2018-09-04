'use strict'

class LibService {

  /**
   * @constructor
   * @param {Intance} repository lib respository instance
   */
  constructor(repository) {
    this.$repository = repository
  }
  /**
   * get all libs.
   * @return {[String]}        deep learning | machine learning | data science
   *                           libs list
   */
  async findAll () {
    return this.$repository.findAll()
  }
}

module.exports = LibService
