const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Counselor = new mongoose.Schema({
  lastName: {type:String, trim:true, default:''},
  firstName: {type:String, trim:true, default:''},
  school: [{type:Schema.Types.ObjectId, ref:'School'}],
  email: {type:String, trim:true, default:''},
  phone: {type:String, trim:true, default:''}
})

module.exports = mongoose.model('Counselor', Counselor)