const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Schedule = new mongoose.Schema({
  sessionNum: {type:Schema.Types.ObjectId, ref:'Session'}, 
  roomNum: {type: Schema.Types.ObjectId, ref: 'Room'},
  topicCode: {type: Schema.Types.ObjectId, ref: 'Course'},
  ScheduleID: {type: Schema.Types.ObjectId, ref: 'Schedule'}
})

// Virtual for Schedule's url
Schedule
.virtual('url')
.get(function (){
  return '/schedules/' + this._id;
});

// Virtual for Schedule's update url
Schedule
.virtual('urlUpdate')
.get(function (){
  return '/schedules/' + this._id + '/update';
});

// Virtual for Schedule's delete url
Schedule
.virtual('urlDelete')
.get(function (){
  return '/schedules/' + this._id + '/delete';
});

module.exports = mongoose.model('Schedule', Schedule)