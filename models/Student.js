const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')
const Schema = mongoose.Schema;

const Student = new mongoose.Schema({
  lastName: {type:String, trim:true, required:true, default:''},
  firstName: {type:String, trim:true, required:true, default:''},
  school: [{type: Schema.Types.ObjectId, ref: 'School'}],
  email: {type:String, trim:true, required:true, unique:true, default:''},
  timeStamp: {type: Date, trim: true, required: true, default:Date.now},
  choice1: [{type: Schema.Types.ObjectId,  ref: 'Topics'}],
  choice2: [{type: Schema.Types.ObjectId,  ref: 'Topics'}],
  choice3: [{type: Schema.Types.ObjectId,  ref: 'Topics'}],
  choice4: [{type: Schema.Types.ObjectId,  ref: 'Topics'}],
  choice5: [{type: Schema.Types.ObjectId,  ref: 'Topics'}],
})

// Virtual for Participant's proper name
Student
.virtual('properName')
.get(function (){
  return this.lastName + ', ' + this.firstName;
});

// Virtual for Participant's full name
Student
.virtual('fullName')
.get(function (){
  return this.firstName + ' ' + this.lastName;
});


Student.plugin(uniqueValidator, { message: 'This {PATH} has already been used' });
module.exports = mongoose.model('Student', Student)