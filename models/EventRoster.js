const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const EventRoster = new mongoose.Schema({
  scheduledEvent: [{type: Schema.Types.ObjectId, ref:'ScheduledEvent'}],
  student: [{type: Schema.Types.ObjectId, ref:'Student'}]
  
})

module.exports = mongoose.model('EventRoster', EventRoster)