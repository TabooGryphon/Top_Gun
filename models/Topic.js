const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Topic = new mongoose.Schema({
  title: {type:String, required:true, trim:true, default:''},
  description: {type: String, required: true, trim: true, }
})

// Virtual for School's location
Topic
.virtual('url')
.get(function (){
  return '/topics/' + this._id;
});

module.exports = mongoose.model('Topic', Topic)