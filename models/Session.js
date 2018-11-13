const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventRoster = new mongoose.Schema({
  sessionNumber: {type:Number, trim: true, enum:[1, 2, 3, 4]},
  time: {type:Date, trim:true, default:''}
})



module.exports = mongoose.model('EventRoster', EventRoster)