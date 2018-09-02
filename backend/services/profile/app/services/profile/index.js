'use strict'

const Error = require('./errors/error')
const Validator = require('email-validator')
const NotFoundError = require('./errors/not-found-error')
const MissingProperty = require('./errors/missing-property-error')
const InvalidEmailError = require('./errors/invalid-email-error')

const DEFAULT_PAGINATION_LIMIT = 50
class ProfileService {
  /**
   * @param {Object}  storage    Storages instances.
   * @param {Object}  repository Repositories instances.
   */
  constructor (storage, repository) {
    this.$storage = storage
    this.$repository = repository
  }

  /**
   * Creates a new profile.
   * @param  {Object} provider profile object
   * @return {Object}          created object
   */
  async create (provider) {
    // TODO: nickName is unique (role)
    // TODO: add a chain of resposabilities patterns here
    if (provider.name.first && provider.name.last){
      throw new MissingProperty('name or last name')
    }
    if (!provider.email) {
      throw new MissingProperty('e-mail')
    }
    if (Validator.validate(provider.email)){
      throw new InvalidEmailError(provider.email)
    }
    return this.$storage.create(provider)
  }

  /**
   * Find a profile by user nickname
   * @param  {String} nickName user nickname
   * @return {Object}          property nickName
   */
  async findByNickName (nickName) {
    const profile = await this.$repository.findByNickName(nickName)
    if (!profile) {
      throw new NotFoundError('profile', nickName, 'nick name' )
    }
    return profile
  }

  /**
   * search profile.
   * @param  {Object} filter filter to search a profile
   * @return {Object}
   */
  async search (params) {
    const {
      nickName = null,
      name: {
        first = null,
        last = null
      },
      aboutMe = null,
      work = null,
      email = null,
      filter = null,
      offset = 0,
      limit = DEFAULT_PAGINATION_LIMIT
    } = params

    const regexParam = (filter !== null) ? new RegExp(filter, 'i') : null

    const query = cleanDeep({
      'nickName': nickName ? nickName : null,
      'name.first': name.first ? name.first : null,
      'name.last': name.last ? name.last : null,
      'aboutMe': aboutMe ? aboutMe : null,
      'work': work ? work : null,
      'email': email ? email : null,
      $or: filter ? [
        { 'nickName': regexParam },
        { 'name.first': regexParam },
        { 'name.last': regexParam },
        { 'aboutMe': regexParam },
        { 'work': regexParam },
        { 'email': regexParam }
      ] : null
    })

    query.deletedAt = null

    const profiles = await this.$repository.search(query, parseInt(offset), parseInt(limit))

    const count = profiles.length

    profiles.range = {
      from: offset,
      to: offset + count
    }

    return providers
  }
}

module.exports = ProfileService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
module.exports.MissingProperty = MissingProperty
module.exports.InvalidEmailError = InvalidEmailError
