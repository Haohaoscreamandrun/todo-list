const mongoose = require('mongoose')
const Schema = mongoose.Schema
const todoSchema = new Schema({
  name:{ // every todo has a name
    type: String, // which is a string
    required: true // and cannot be skipped
  },
  done:{
    type: Boolean
  }
})

module.exports = mongoose.model('Todo', todoSchema)