const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Location = new mongoose.Schema({
  room: {type:String, required: true, trim:true, default:''},
  building: {type:String, required:true, trim: true, default:''},
  capacity: {type: Number, required:true, trim: true, default:''}
})

module.exports = mongoose.model('Location', Location)