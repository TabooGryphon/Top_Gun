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

exports.main =  function(req, res, next){
  res.render('index', {});
};

exports.topic_list_get = function(req, res, next){

  Topic.find({})
  .sort({name: 'asc'})
  .then(function(topics, err){
    if(err){
      res.render('error', {error: err})
    } else {
      res.render('topic_list', {topics});
    }
  })
}

exports.topic_list_update = function(req, res) {
    const query = req.query
	const topicId = query.id
	delete query['id']

	Topic.findByIdAndUpdate(topicId, query, {new:true})
	.then(topic_list => {
		res.json({
			confirmation: 'success',
			data: topic_list
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.topic_list_remove = function(req, res) {
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

exports.topic_id = function(req, res) {
	const id = req.params.id

	Topic.findById(id)
	.then(topic_list => {
		res.json({
			confirmation: 'success',
			data: topic_list
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Topic ' + id + ' not found.'
		})
	})
}


exports.topic_list_post = function(req, res) {
    Topic.create(req.body)
	.then(topic => {
		res.json({
			confirmation: 'success',
			data: topic_list
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.topic_detail_get = function(req, res, next){

  Topic.findById(req.params.id)
  .then(function(topic, err){
    if(err){
      res.render('error', {error: err});
    } else {
      res.render('topic_detail', {topic});
    }
  })
}

exports.topic_detail_update = function(req, res) {
    const query = req.query
	const topicId = query.id
	delete query['id']

	Topic.findByIdAndUpdate(topicId, query, {new:true})
	.then(topic_detail => {
		res.json({
			confirmation: 'success',
			data: topic_detail
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}

exports.topic_detail_remove = function(req, res) {
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

exports.topic_detail_id = function(req, res) {
	const id = req.params.id

	Topic.findById(id)
	.then(topic_detail => {
		res.json({
			confirmation: 'success',
			data: topic_detail
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: 'Topic ' + id + ' not found.'
		})
	})
}


exports.topic_detail_post = function(req, res) {
    Topic.create(req.body)
	.then(topic_detail => {
		res.json({
			confirmation: 'success',
			data: topic_detail
		})
	})
	.catch(err => {
		res.json({
			confirmation: 'fail',
			message: err.message
		})
	})
}