const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Student = new mongoose.Schema({
  lastName: {type:String, trim:true, default:''},
  firstName: {type:String, trim:true, default:''},
  nickname: {type:String, trim: true, default:''},
  school: [{type: Schema.Types.ObjectId, ref: 'School'}],
  counselor: [{type: Schema.Types.ObjectId, ref: 'Counselor'}],
  email: {type:String, trim:true, default:''},
  choice1: {type:String, trim:true, default:''},
  choice2: {type:String, trim:true, default:''},
  choice3: {type:String, trim:true, default:''},
  choice4: {type:String, trim:true, default:''},
  choice5: {type:String, trim:true, default:''},
  time: {type:Date, default:''}
})

module.exports = mongoose.model('Student', Student)