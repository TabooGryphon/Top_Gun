const { body,validationResult } = require('express-validator/check');
const { sanitizeBody } = require('express-validator/filter');

var School = require('../models/School');
var Presenter = require('../models/Presenter');
var Room = require('../models/Room');
var Schedule = require('../models/Schedule');
var Session = require('../models/Session');
var Student = require('../models/Student');
var Topic = require('../models/Topic');
var async = require('async');

exports.main = function(req, res) {
  res.render('index', {ryan:'Ryan'});
}

exports.students_get = function(req, res, next){

  Student.find({})
  .populate('school')
  .sort({name: 'asc'})
  .then(function(results){
  res.render('admin_students', {students: results})
  })
}

exports.student_update = function(req, res) {
    const query = req.query
	const studentId = query.id
	delete query['id']

	Student.findByIdAndUpdate(studentId, query, {new:true})
	.then(student => {
		res.json({
			confirmation: 'success',
			data: student
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.student_remove = function(req, res) {
    const query = req.query

	Student.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'Student '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.student_id = function(req, res) {
	const id = req.params.id

	Student.findById(id)
	.then(student => {
		res.json({
			confirmation: 'success',
			data: student
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Student ' + id + ' not found.'
		})
	})
}


exports.student_post = function(req, res) {
    Student.create(req.body)
	.then(student => {
		res.json({
			confirmation: 'success',
			data: student
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.schools_get = function(req, res, next){
  
  School.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_schools', {schools: results});
  })
}

exports.schools_update = function(req, res) {
    const query = req.query // require: id, key=value
	const schoolsId = query.id
	delete query['id']

	School.findByIdAndUpdate(schoolsId, query, {new:true})
	.then(schools => {
		res.json({
			confirmation: 'success',
			data: schools
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.schools_remove = function(req, res) {
    const query = req.query

	School.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'School '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.student_id = function(req, res) {
	const id = req.params.id

	School.findById(id)
	.then(schools => {
		res.json({
			confirmation: 'success',
			data: schools
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'School ' + id + ' not found.'
		})
	})
}


exports.schools_post = function(req, res) {
    Schools.create(req.body)
	.then(schools => {
		res.json({
			confirmation: 'success',
			data: schools
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}


exports.topics_get = function(req, res, next){
  
  Topic.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_topics', {topics: results});
  })
}

exports.topics_update = function(req, res) {
    const query = req.query // require: id, key=value
	const topicId = query.id
	delete query['id']

	Topic.findByIdAndUpdate(topicId, query, {new:true})
	.then(topics => {
		res.json({
			confirmation: 'success',
			data: topics
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.topics_remove = function(req, res) {
    const query = req.query

	Topic.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'Topic '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.topics_id = function(req, res) {
	const id = req.params.id

	Topic.findById(id)
	.then(topics => {
		res.json({
			confirmation: 'success',
			data: topics
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Topic ' + id + ' not found.'
		})
	})
}


exports.topics_post = function(req, res) {
    Topic.create(req.body)
	.then(topics => {
		res.json({
			confirmation: 'success',
			data: topics
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.presenters_get = function(req, res, next){

  Presenter.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_presenters', {presenters: results});
  })
}

exports.presenters_update = function(req, res) {
    const query = req.query // require: id, key=value
	const presenterId = query.id
	delete query['id']

	Student.findByIdAndUpdate(presenterId, query, {new:true})
	.then(presenters => {
		res.json({
			confirmation: 'success',
			data: presenters
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.student_remove = function(req, res) {
    const query = req.query

	Presenter.findByIdAndRemove(query.id)
	.then(data => {
		res.json({
			confirmation: 'success',
			data: 'Presenter '+query.id+' successfully removed.'
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.presenters_id = function(req, res) {
	const id = req.params.id

	Presenter.findById(id)
	.then(presenters => {
		res.json({
			confirmation: 'success',
			data: presenters
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Presenter ' + id + ' not found.'
		})
	})
}


exports.presenters_post = function(req, res) {
    Presenter.create(req.body)
	.then(presenters => {
		res.json({
			confirmation: 'success',
			data: presenters
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}
