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

exports.schools_get = function(req, res, next){
  
  School.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_schools', {schools: results});
  })
}

exports.topics_get = function(req, res, next){
  
  Topic.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_topics', {topics: results});
  })
}

exports.presenters_get = function(req, res, next){

  Presenter.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_presenters', {presenters: results});
  })
}

