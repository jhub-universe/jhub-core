'use strict'

const env = require('sugar-env')

module.exports = {
  mongodb: {
    uri: env.get('MONGODB_URI'),
    options: {
      dbName: env.get('MONGODB_DBNAME')
    }
  }
}
