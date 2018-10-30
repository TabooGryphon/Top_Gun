const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const ScheduledEvent = new mongoose.Schema({
  course: [{type: Schema.Types.ObjectId, ref: 'Course'}],
  instructor: [{type: Schema.Types.ObjectId, ref: 'Instructor'}],
  room: [{type: Schema.Types.ObjectId, ref: 'Room'}],
  session: {type: Number, enum: [1, 2, 3, 4]},
  rosterSize: {type: Number, trim: true, default: 0 },
  
})

module.exports = mongoose.model('ScheduledEvent', ScheduledEvent)