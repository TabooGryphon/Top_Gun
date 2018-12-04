const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Topic = new mongoose.Schema({
  title: {type:String, required:true, trim:true, default:''},
  description: {type: String, required: true, trim: true, }
})

module.exports = mongoose.model('Topic', Topic)