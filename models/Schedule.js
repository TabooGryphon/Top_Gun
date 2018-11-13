const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Schedule = new mongoose.Schema({
  sessionNum: {type:Schema.Types.ObjectId, ref:'Session'}, 
  roomNum: {type: Schema.Types.ObjectId, ref: 'Room'},
  topicCode: {type: Schema.Types.ObjectId, ref: 'Course'},
  presenterID: {type: Schema.Types.ObjectId, ref: 'Presenter'}
})

module.exports = mongoose.model('Schedule', Schedule)