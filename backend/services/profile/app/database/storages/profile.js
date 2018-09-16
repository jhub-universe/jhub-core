'use strict'

const { pick } = require('lodash')

class ProfileStorage {
  /**
   * @param {Object} model Profile model.
   */
  constructor (model) {
    this.$model = model
  }

  /**
   * Creates a new Profile
   * @param params New Profile data
   * @returns {Promise<Object>}
   */
  async create (params) {
    const profile = {
      user: pick(params, [
        'nickName',
        'name.first',
        'name.last',
        'email',
        'showEmail',
        'aboutMe',
        'webSite',
        'work',
        'country',
      ]),
      followers: [],
      following: [],
      planets: []
    }
    // TODO: create an example planet when create a new profile
    return this.$model.create(profile)
                       .then(document => document.toObject())
  }


  /**
   * add a new Profile into following array
   * @param params New Profile data
   * @returns {Promise<Object>}
   */
  async addFollowing (profileId, params) {
    const following = pick(params, [
        '_id',
        'user.nickName',
        'user.name.first',
        'user.name.last',
        'user.email',
        'user.showEmail',
        'user.aboutMe',
        'user.webSite',
        'user.work',
        'country.country',
      ])
    const query = {
      $push: { following }
      //$inc: { 'following.count': 1 }
    }
    return this.$model.update( { _id: profileId }, query)
  }

    /**
   * add a new Profile into follower array
   * @param params New Profile data
   * @returns {Promise<Object>}
   */
  async addFollower (profileId, params) {
    const follower = pick(params, [
        '_id',
        'user.nickName',
        'user.name.first',
        'user.name.last',
        'user.email',
        'user.showEmail',
        'user.aboutMe',
        'user.webSite',
        'user.work',
        'country.country',
      ])
    const query = {
      $push: { followers: follower }
      // $inc: { 'follower.count': 1 }
    }

    return this.$model.update( { _id: profileId }, query)
  }
}

module.exports =  ProfileStorage 
