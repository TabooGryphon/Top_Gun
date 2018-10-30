const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Course = new mongoose.Schema({
  name: {type:String, trim:true, default:''}
})

module.exports = mongoose.model('Course', Course)