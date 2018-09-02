'use strict'

const { Schema } = require('mongoose')
const Planet = require('./planet')

const properties = {
  user: {
    type: {
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
        type: Strnameing,
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
    },
    required: true
  },
  followers: [{
    profileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'profile'
    },
    user: {
      type: User,
      required: true,
    },
    followedDate:{
      type: Date,
      required: true,
      default: Date.now()
    }
  }],
  following: [{
    profileId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'profile'
    },
    user: {
      type: User,
      required: true,
    },
    followedDate:{
      type: Date,
      required: true,
      default: Date.now()
    }
  }],
  planets: {
    type: [{
      PlanetId: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      name: {
        type: String,
        required: true,
      },
      stared: {
        type: Number,
        required: true,
        default: () => 0
      },
      imageURL: {
        type: String,
        required: false,
        default: () => null
      }
    }],
    required: true,
    default: () => [],
  },
  deletedAt: {
    type: Date,
    required: true,
    default: () => null,
  },
  CreatedAt: {
    type: Date,
    required: true,
    default: () => null,
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
