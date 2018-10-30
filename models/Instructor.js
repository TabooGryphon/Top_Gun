const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Instructor = new mongoose.Schema({
  lastName: {type:String, trim:true, default:''},
  firstName: {type:String, trim:true, default:''},
  profession: {type:String, trim:true, default:''}
})

module.exports = mongoose.model('Instructor', Instructor)