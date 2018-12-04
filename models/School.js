const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const School = new mongoose.Schema({
  name: {type:String, trim:true, default:''},
  address: {type:String, trim:true, default:''},
  phone: {type:String, trim:true, default:''},
  counselor: [{type: Schema.Types.ObjectId, ref:'Counselor'}],
  accessCode: {type:String, trim:true, default:''}
})

module.exports = mongoose.model('School', School)