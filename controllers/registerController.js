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

      School.find({})
      .sort({name: "asc"})
      .then(function(schools){
        Topic.find({})
        .sort({name: "asc"})
        .then(function(topics){
          res.render('register', {schools, topics})
        })
      })
  }

// Register Create Student Post
exports.register_post = function registerStudent(req, res, next){

    const errors = validationResult(req);

    Student.find({'email': req.body.email})
    .then(function(results){
      if (results){
        return 
      }
    })
    
    var student_register = new Student({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      school: req.body.school,
      email: req.body.email,
      timeStamp: new Date,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      choice5: req.body.choice5,
    })

    Student.create(student_register, function(err, thestudent){
      if (err){
        res.render('error' ,{error: err});
      }else{
        res.render('success', {thestudent});
        console.log(req.body.school);
      }
    })
  }