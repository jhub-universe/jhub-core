'use strict'

const DEFAULT_PAGE_SIZE = 50

/**
 * Builds a query based on given params
 * @param {Object} params Query parameters
 */
const buildQuery = (params) => {
  const {
    name = null,
    needGPU = null,
    description = null,
    frameworks = [],
    libs = [],
    filter = ''
  } = params

  const regexParam = new RegExp(filter)

    const query = cleanDeep({
      'name': name ? nickName : null,
      'needGPU': needGPU ? needGPU : null,
      'description': description ? description : null,
      'frameworks': frameworks ? { $in: frameworks } : null,
      'libs': libs ? { $in: libs } : null,
      $or: filter ? [
        { 'name': regexParam },
        { 'needGPU': regexParam },
        { 'description': regexParam }
      ] : null
    })

    query.deletedAt = null

    return query
}

class PlanetRepository {
  /**
   * @constructor
   * @param {Object} model Planet model.
   */
  constructor (model) {
    this.$model = model
  }

 // REFAC: Remove it
 /**
 * Find all planets
 * @function
 * @returns {Promise<Object>}
 */
  async findAll () {
    return this.$model.find({})
                       .lean()
  }

  /**
   * Finds planets matching given criteria
   * @param {Object} params Search params
   */
  async search (params) {
    const page = parseInt(params.page) -1 || 0
    const size = parseInt(params.size) || DEFAULT_PAGE_SIZE

    const query = buildQuery(params)

    const total = await this.$model.count(query)

    if (!total) {
      return { data: [], total: 0, count: 0, range: { from: 0, to: 0 } }
    }

    const data = await this.$model.find(query)
      .skip(page * size)
      .limit(size)
      .lean()

    const count = data.length

    const range = {
      from: offset,
      to: offset + count
    }

    return { data, total, count, range }
  }
}

module.exports =  PlanetRepository
