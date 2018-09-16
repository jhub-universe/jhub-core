'use strict'

class ProfileRepository {
  /**
   * @constructor
   * @param {Object} model Profile model.
   */
  constructor (model) {
    this.$model = model
  }

 /**
 * Find by nickname property.
 * @function
 * @returns {Promise<Object>}
 */
  async findByNickName (nickName) {
    // find with limit = 1 is faster than findOne
    const profiles = await this.$model.find({ 'user.nickName': nickName })
                                     .limit(1)
                                     .lean()
    return profiles[0]
  }

   /**
   * Find by id property.
   * @function
   * @returns {Promise<Object>}
   */
  async findById (id) {
    // find with limit = 1 is faster than findOne
    const profiles = await this.$model.find({ _id: id })
                                    .limit(1)
                                    .lean()
    return profiles[0]
  }
  /** Find profiles by a criteria
   * @param {Object} query Object containing search criteria to filter
   */
  async search (query, offset, limit) {
    const total = await this.$model.count(query)
    
    if (total === 0) {
      return { data: [], total: 0 }
    }

    const data = await this.$model.find(query)
                                  .skip(offset)
                                  .limit(limit)
                                  .lean()

    return { data, total }
  }
}

module.exports =  ProfileRepository
