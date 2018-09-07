'use strict'

const { Schema } = require('mongoose')

// TODO: move this file and the user file to a specific path
// REFAC: get it from the datase or a enum type
const enums = {
    frameworks: [
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
    openedBy:{
        users: {
            type: [ { 
                id: Schema.Types.ObjectId,
                atDate: simpleType.atDate  
            }],
            required: true,
        },
        count: simpleType.count
    },
    staredBy: {
        users: {
            type: [ { 
                id: Schema.Types.ObjectId,
                atDate: simpleType.atDate  
            }],
            required: true,
        },
        count: simpleType.count
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
  staredBy: {
      type: [ complexyType.staredBy ],
      required: true,
      default: () => 0
  },
  openedBy: {
    type: complexyType.openedBy,
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
  frameworks: {
      type: [String],
      required: true,
      // enum: enums.frameworks,
      default: () => 'nothing'
  },
  libs: {
    type: String,
    required: true,
    // enum: enums.libs,
    default: () => 'nothing'
  },
  deletedAt: {
    type: Date,
    required: false,
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
