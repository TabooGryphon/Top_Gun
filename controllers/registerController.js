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

// Register Create Student Get Form
exports.register_get = function(req, res, next){
  var schools;
  School.find({})
  .sort({name: "asc"})
  .then(function(school){
    schools = school;
  })
  res.render('register', {schools})
}

// Register Create Student Post
exports.register_post = function(req, res, next){
  // Validate fields.
  body('firstName', 'Please enter your First Name.').isLength({ min: 1 }).trim(),
  body('lastName', 'Please enter your Last Name.').isLength({ min: 1 }).trim(),
  body('address', 'Please enter your Address.').isLength({ min: 1 }).trim(),
	body('school', 'Please select your School').isLength({ min: 1 }).trim(),
	body('email', 'Please enter your E-Mail.').isLength({ min: 1 }).trim(),
	body('phone', 'Please enter your Phone Number.').isLength({ min: 1 }).trim(),
	body('choice1', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice2', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice3', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice4', 'Please make fill all choices').isLength({ min: 1 }).trim(),
	body('choice5', 'Please make fill all choices').isLength({ min: 1 }).trim(),

  // Sanitize fields.
  sanitizeBody('firstName').trim().escape(),
  sanitizeBody('lastName').trim().escape(),
  sanitizeBody('address').trim().escape(),
  sanitizeBody('email').trim().escape(),
	sanitizeBody('phone').trim().escape();
  
  var id = req.params.id;
  var school_id = School.find({name: req.body.school}).exec();

  
}