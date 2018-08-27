'use strict'

const { Schema } = require('mongoose')

const properties = {
  nickName: {
    type: String,
    required: true,
  },
  name: {
    type: {
      first: {
        type: String,
        required: true,
      },
      last: {
        type: String,
        required: true,
      },
    },
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  showEmail: {
    type: Boolean,
    required: true,
    default: () => false,
  },
  aboutMe: {
    type: String,
    required: true,
    default: () => null,
  },
  webSite:{
    type: String,
    required: false,
    default: () => null
  },
  work: {
    type: String,
    required: false,
    default: () => null,
  },
  // REFAC: Add a enum to accept only the wold countries
  country: {
    type: String,
    required: false,
    default: () => null,
  }
}

const options = {
  id: false,
  _id: false,
  strict: true,
  safe: true,
  timestamps: false,
  versionKey: false
}

const schema = new Schema(properties, options)
const factory = (connection) => {
  throw new Error('cannot instantiate an embbeded document')
}

module.exports =  { factory }
module.exports.schema = schema
