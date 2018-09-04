'use strict'

class FrameworkService {

  /**
   * @constructor
   * @param {Intance} repository Framework respository instance
   */
  constructor(repository) {
    this.$repository = repository
  }
  /**
   * get all frameworks.
   * @return {[String]}        deep learning | machine learning | data science
   *                           framework list
   */
  async findAll () {
    return this.$repository.findAll()
  }
}

module.exports = FrameworkService
