'use strict'

const { Schema } = require('mongoose')
const User = require('./user')

// REFAC: get it from the datase or a enum type
const enums = {
    framworks: [
        'Caffe',
        'CNTK',
        'TORCH',
        'PYTORCH',
        'MXNET',
        'CHAINER',
        'KERAS',
        'Tensorflow',
        'DeepLearning4j',
        'spark-deep-learning',
        'elephas',
        'Dist-keras',
        'nothing'
        ]    ,
    libs: [
        'NumPy',
        'SciPy',
        'Pandas',
        'StatsModels',
        'Matplotlib' ,
        'Seaborn',
        'Plotly',
        'Bokeh',
        'Pydot',
        'Scikit-learn',
        'Eli5',
        'nothing'
    ] 
} 
// REFAC: get it from a other file
const simpleType = {
    atDate: {
        type: Date,
        required: true,
        default: () => Date.now(),
    },
    count: {
        type: Number,
        required: true,
        default: () => 0,
    }
}
// REFAC: get it from a other file
const complexyType = {
    opened: {
        by: [{
            userId: {
                type: Schema.Types.ObjectId,
                required: true,
            }
        }],
        atDate: simpleType.atDate,
        count: simpleType.count
    },
    stared: {
        user: {
            type: User,
            required: true,
        },
        atDate: simpleType.atDate
    },
    jupyterNotebook: {
        link: {
            type: String,
            required: true,
        },
        size: {
            type: Number,
            required: false,
            default: () => 0
        },
        imageURL:{
            type: String,
            required: false,
            default: () => null,
        },
        needGPU: {
            type: Boolean,
            required: true,
            default: () => false
        }
    }
}

const properties = {
  name: {
    type: String,
    required: true,
  },
  stared: {
      type: [ complexyType.stared ]
  },
  opened: {
    type: complexyType.opened,
    required: true,
    default: () => []
  },
  jupyterNotebook: {
      type: complexyType.jupyterNotebook,
      required: true,
  },
  views: {
    type: Number,
    required: true,
    default: () => 0,
  },
  isPublic: {
      type: Boolean,
      required: true,
      default: () => false
  },
  description: {
    type: String,
    required: true,
    default: () => null,
  },
  framworks: {
      type: String,
      required: true,
      enum: enums.framworks,
      default: () => 'nothing'
  },
  libs: {
    type: String,
    required: true,
    enum: enums.libs,
    default: () => 'nothing'
  },
  deletedAt: {
    type: Date,
    required: true,
    default: () => null,
  }
}

const options = {
  id: false,
  collection: 'planet',
  strict: true,
  safe: true,
  timestamps: false,
  versionKey: false
}

const schema = new Schema(properties, options)

const factory = (connection) => {
    return connection.model('Planet', schema)
}

module.exports =  { factory }
module.exports.schema = schema
