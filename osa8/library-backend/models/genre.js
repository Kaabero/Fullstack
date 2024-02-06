const mongoose = require('mongoose')

const uniqueValidator = require('mongoose-unique-validator')

const schema = new mongoose.Schema({
  genre: {
    type: String,
    unique: true,
    
  }
})

schema.plugin(uniqueValidator)

module.exports = mongoose.model('Genre', schema)