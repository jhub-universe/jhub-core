'use strict'

const { Schema } = require('mongoose')

const user = {
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
    required: true,
    default: () => null
  },
  work: {
    type: String,
    required: true,
    default: () => null,
  },
  // REFAC: Add a enum to accept only the wold countries
  country: {
    type: String,
    required: true,
    default: () => null,
  }
}

const properties = {
  user: {
    type: user,
    required: true
  },
  followers: [{
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'profile'
    },
    user: {
      type: user,
      required: true,
    },
    followedDate:{
      type: Date,
      required: false,
      default: Date.now()
    }
  }],
  following: [{
    _id: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'profile'
    },
    user: {
      type: user,
      required: true,
    },
    followedDate:{
      type: Date,
      required: false,
      default: Date.now()
    }
  }],
  deletedAt: {
    type: Date,
    required: false,
    default: () => null,
  },
  createdAt: {
    type: Date,
    required: false,
    default: () => Date.now(),
  },
}

const options = {
  id: false,
  collection: 'profile',
  strict: true,
  safe: true,
  timestamps: false,
  versionKey: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
  return connection.model('Profile', schema)
}

module.exports = { factory }
module.exports.schema = schema
