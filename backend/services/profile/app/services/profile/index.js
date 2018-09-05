'use strict'

const Error = require('./errors/error')
const cleanDeep = require('clean-deep')
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
  async create (user) {
    // TODO: nickName is unique (role)
    // REFAC: add a chain of resposabilities patterns here
    if (!user.name.first || !user.name.last){
      throw new MissingProperty('first name or last name')
    }
    if (!user.email) {
      throw new MissingProperty('e-mail')
    }
    if (!Validator.validate(user.email)){
      throw new InvalidEmailError(user.email)
    }
    return this.$storage.create(user)
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
      name = {},
      aboutMe = null,
      work = null,
      email = null,
      filter = null,
      offset = 0,
      limit = DEFAULT_PAGINATION_LIMIT
    } = params
    const regexParam = (filter !== null) ? new RegExp(filter, 'i') : null

    const query = cleanDeep({
      'user.nickName': nickName ? nickName : null,
      'user.name.first': name.first ? name.first : null,
      'user.name.last': name.last ? name.last : null,
      'user.aboutMe': aboutMe ? aboutMe : null,
      'user.work': work ? work : null,
      'user.email': email ? email : null,
      $or: filter ? [
        { 'user.nickName': regexParam },
        { 'user.name.first': regexParam },
        { 'user.name.last': regexParam },
        { 'user.aboutMe': regexParam },
        { 'user.work': regexParam },
        { 'user.email': regexParam }
      ] : null
    })

    query.deletedAt = null

    console.log(query)

    const profiles = await this.$repository.search(query, parseInt(offset), parseInt(limit))

    const count = profiles.length

    profiles.range = {
      from: offset,
      to: offset + count
    }

    return profiles
  }
}

module.exports = ProfileService
module.exports.Error = Error
module.exports.NotFoundError = NotFoundError
module.exports.MissingProperty = MissingProperty
module.exports.InvalidEmailError = InvalidEmailError
