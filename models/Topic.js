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

// Virtual for Topic's update url
Topic
.virtual('urlUpdate')
.get(function (){
  return '/topics/' + this._id + '/update';
});

// Virtual for Topic's delete url
Topic
.virtual('urlDelete')
.get(function (){
  return '/topics/' + this._id + '/delete';
});

module.exports = mongoose.model('Topic', Topic)