const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Instructor = new mongoose.Schema({
  lastName: {type:String, trim:true, default:''},
  firstName: {type:String, trim:true, default:''},
  occupation: {type:String, trim:true, default:''},
  mainPhone: {type:String, trim:true, default:''},
  cellPhone: {type:String, trim:true, default:''},
  email:{type:String, trim:true, default:''}
})

// Virtual for Instructor's proper name
Instructor
.virtual('properName')
.get(function (){
  return this.lastName + ', ' + this.firstName;
});

// Virtual for Instructor's full name
Instructor
.virtual('properName')
.get(function (){ 
  return this.firstName + ' ' + this.lastName;
});

module.exports = mongoose.model('Instructor', Instructor)