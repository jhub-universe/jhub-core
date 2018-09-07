'use strict'

const app = require('../app')
const sinon = require('sinon')
const env = require('sugar-env')
const { expect } = require('chai')
const axiosist = require('axiosist')
const mongoose = require('mongoose')

const config = require('../config')

const PlanetRepository = require('../app/database/repositories/planet')

describe('GET /', () => {
  let api

  before(() => {
    sinon.stub(mongoose, 'createConnection')
      .returns(mongoose)

    sinon.stub(PlanetRepository.prototype, 'search')

    api = axiosist(app(config, env.TEST))
  })

  afterEach(() => {
    PlanetRepository.prototype.search.reset()
  })

  after(() => {
    mongoose.createConnection.restore()
    PlanetRepository.prototype.search.restore()
  })

  describe('when results are paginated', () => {
    let response

    before(async () => {
      PlanetRepository.prototype.search.returns({ data: [{}], total: 1, count: 1, range: { from: 0, to: 1 } })

      response = await api.get('/')
        .catch(err => err.response)
    })

    it('returns 200', async () => {
      expect(response.status).to.be.equals(200)
    })

    it('returns an array', async () => {
      expect(response.data).to.be.an('array')
    })
  })

  describe('when results are paginated', () => {
    let response

    before(async () => {
      PlanetRepository.prototype.search.returns({ data: [{}], total: 2, count: 1, range: { from: 0, to: 1 } })

      response = await api.get('/')
    })

    it('returns 206', async () => {
      expect(response.status).to.be.equals(206)
    })

    it('returns an array', async () => {
      expect(response.data).to.be.an('array')
    })

    it('has an `content-range` header', async () => {
      expect(response.headers).to.have.a.property('content-range')
    })

    describe('the `content-range` header', () => {
      it('has a from, to and total values', async () => {
        expect(response.headers['content-range']).to.match(/results [0-9]+-[0-9]+\/[0-9]+/)
      })
    })
  })

  describe('when no results are found', () => {
    let response

    before(async () => {
      PlanetRepository.prototype.search.returns({ data: [], total: 0, count: 0, range: { from: 0, to: 0 } })

      response = await api.get('/')
    })

    it('returns 200', async () => {
      expect(response.status).to.be.equals(200)
    })

    it('returns an array', async () => {
      expect(response.data).to.be.an('array')
    })

    describe('the array', () => {
      it('is empty', async () => {
        expect(response.data.length).to.be.equals(0)
      })
    })
  })
})
