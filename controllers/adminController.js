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
  
  res.render('index');
}

// STUDENTS

exports.students_list_get = function(req, res, next){

  Student.find({})
  .populate('school')
  .sort({lastName: 'asc'})
  .then(function(results, err){
    if(err){
      res.render('error', {error: err})
    } else{
    res.render('admin_students_list', {students: results})
    }
  })
}

exports.students_detail_get = function(req, res, next){

  Student.findById(req.params.id)
  .populate('school')
  .populate('choice1')
  .populate('choice2')
  .populate('choice3')
  .populate('choice4')
  .populate('choice5')
  .then(function(results, err){
    if (err){
      res.render('error', {error: err});
    } else {
      console.log(results.choice1);
      res.render('admin_students_detail', {students: results});
    }
  })
  }

exports.students_create_get = function(req, res, next){
  School.find({})
      .sort({name: "asc"})
      .then(function(schools){
        Topic.find({})
        .sort({name: "asc"})
        .then(function(topics){
          res.render('admin_students_create', {schools, topics})
        })
      })
}

exports.students_create_post = [

  // Validate fields.
  body('firstName', 'Please enter your First Name.').isLength({ min: 1 }).trim(),
  body('lastName', 'Please enter your Last Name.').isLength({ min: 1 }).trim(),
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
  sanitizeBody('phone').trim().escape(),

  function addStudent(req, res, next){

    const errors = validationResult(req);
    
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
        res.redirect('/admin' + thesuudent.url, {thestudent});
        console.log(req.body.school);
      }
    })
  }
  
]

exports.students_update_get = function(req, res, next){

  async.parallel({
    students: function(callback) {
      Student.findById(req.params.id)
      .populate('school')
      .populate('choice1')
      .populate('choice2')
      .populate('choice3')
      .populate('choice4')
      .populate('choice5')
      .exec(callback)
    },
    schools: function(callback) {
        School.find({})
        .sort({name: 'asc'})
        .exec(callback)
    },
    topics: function(callback){
      Topic.find({})
      .sort({name:'asc'})
      .exec(callback)
    }
}, function(err, results) {
    if (err) { return next(err); }
    res.render('admin_students_update', {students: results.students, schools: results.schools, topics: results.topics});
});

}

exports.students_update_post = [

  // Validate fields.
  body('firstName', 'Please enter your First Name.').isLength({ min: 1 }).trim(),
  body('lastName', 'Please enter your Last Name.').isLength({ min: 1 }).trim(),
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
  sanitizeBody('phone').trim().escape(),


  function(req, res, next){

    var admin_student_update = new Student({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      school: req.body.school,
      email: req.body.email,
      timeStamp: 'blank',
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      choice5: req.body.choice5,
      _id: req.params.id
    })

    Student.findByIdAndUpdate(req.params.id, admin_student_update)
    .exec(function(err, results){
      if(err){
        res.render('error', {error: err})
      } else {
        res.redirect('/admin' + results.url)
      }
    })
  }

]

//SCHOOLS

exports.schools_list_get = function(req, res, next){
  
  School.find({})
  .sort({name:'asc'})
  .then(function(results){
    res.render('admin_schools_list', {schools: results});
  })
}

exports.schools_detail_get = function(req, res, next){

  School.findById(req.params.id)
  .then(function(results, err){
    if (err){
      res.render('error', {error: err})
    } else{
      res.render('admin_schools_detail', {schools: results})
    }
  })
}


//TOPICS

exports.topics_list_get = function(req, res, next){
  
  Topic.find({})
  .sort({title:'asc'})
  .then(function(results){
    res.render('admin_topics_list', {topics: results});
  })
}

exports.topics_detail_get = function(req, res, next){
  res.render('admin_topics_get');  
}

//PRESENTERS

exports.presenters_list_get = function(req, res, next){

  Presenter.find({})
  .sort({name:'asc'})
  .then(function(results, err){
    if (err){
      res.render('error', {error: err});
    } else {
      res.render('admin_presenters_list', {presenters: results});
    }
  })
}

exports.presenters_detail_get = function(req, res, next){
  res.render('admin_presenters_get');
}