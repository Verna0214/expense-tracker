const mongoose = require('mongoose')
const Schema = mongoose.Schema

const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: new Date(),
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  // 待補 userId 及 categoryId
})

module.exports = mongoose.model('Record', recordSchema)