'use strict'

module.exports = {
  profile: {
    create: require('./profile/create'),
    search: require('./profile/search'),
    findByNickName: require('./profile/findByNickName')
  }
}
