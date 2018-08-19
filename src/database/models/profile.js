'use strict'

import { Schema } from 'mongoose'
import { User } from './user'
import { Planet } from './planet'

const properties = {
  user: {
    type: User,
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
  }
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

export { schema as Profile }
export default { factory }
