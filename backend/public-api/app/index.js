'use strict'

const cors = require('cors')
const routes = require('./routes')
const proxy = require('@mantris/proxy')
const thanos = require('@shawee/thanos')

/**
 * Application setup.
 * @param {Object} api                 Express instance.
 * @param {Object} options.config      Application configs.
 * @param {String} options.environment Environment name.
 */
module.exports = thanos((api, config, environment) => {
  api.use(cors(config.cors))

  // api.get('/documents', jwt, scopes('documents.read'), routes.documents.search.factory(config.document))
  // api.post('/documents', jwt, scopes('documents.write'), routes.documents.create.factory(config.document))
  // api.get('/documents/:document', jwt, scopes('documents.read'), routes.documents.find.factory(config.document))
  // api.put('/documents/:document', jwt, scopes('documents.write'), routes.documents.update.factory(config.document))
  // api.delete('/documents/:document', jwt, scopes('documents.delete'), routes.documents.delete.factory(config.document))
})
