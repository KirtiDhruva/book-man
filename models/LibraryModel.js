const mongoose = require('mongoose')
const Schema = mongoose.Schema

const librarySchema = new Schema(
  {
    title: {
      type: String,
      unique: true,
    },

    author: {
      type: String,
    },

    summary: {
      type: String,
      default: 'Summary not available',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Library', librarySchema, 'Library')
