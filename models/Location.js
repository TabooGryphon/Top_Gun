const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Location = new mongoose.Schema({
  room: {type:String, trim:true, default:''},
  capacity: {type: Number, trim: true, default:''}
})

module.exports = mongoose.model('Location', Location)