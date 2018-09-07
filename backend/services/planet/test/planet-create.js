'use strict'

const app = require('../app')
const sinon = require('sinon')
const env = require('sugar-env')
const { expect } = require('chai')
const config = require('../config')
const mongoose = require('mongoose')
const axiosist = require('axiosist')

const fixture = require('./fixtures/planet-create')
const PlanetStorage = require('../app/database/storages/planet')

describe('POST /', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)
    sinon.stub(PlanetStorage.prototype, 'create')

    api = axiosist(app(config, env.TEST))
  })

  after(() => {
    mongoose.createConnection.restore()
    PlanetStorage.prototype.create.restore()
  })

  afterEach(() => {
    PlanetStorage.prototype.create.reset()
  })

  describe('when required parameters are missing', () => {
    let response

    before(async () => {
      response = await api.post('/')
        .catch(err => err.response)
    })

    it('returns 422', async () => {
      expect(response.status).to.be.equals(422)
    })

    it('has a `unprocessable_entity` error code', async () => {
      expect(response.data.error.code).to.be.equals('unacceptable_payload_schema')
    })
  })

  describe('when required fields are given', () => {
    let response

    before(async () => {
      PlanetStorage.prototype.create.returns({ _id: '5b92ea6d994fb639b186fd92' })
      response = await api.post('/', fixture)
        .catch(err => { console.log(err.response.data.error.validations); return err.response })
    })

    it('returns 201', async () => {
      expect(response.status).to.be.equals(201)
    })

    it('returns an object', async () => {
      expect(response.data).to.be.an('object')
    })

    describe('the object', () => {
      it('has an _id property', async () => {
        expect(response.data).to.have.a.property('_id')
      })
    })
  })
})
