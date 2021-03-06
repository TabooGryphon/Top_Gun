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

exports.students_create_post = function addStudent(req, res, next){
    
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
        Student.findById(thestudent._id)
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
          res.render('admin_students_detail', {students: results});
    }
  })
      }
    })
  }

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

exports.students_update_post = function(req, res, next){

    var student_update = new Student({
      lastName: req.body.lastName,
      firstName: req.body.firstName,
      school: req.body.school,
      email: req.body.email,
      timeStamp: req.body.timeStamp,
      choice1: req.body.choice1,
      choice2: req.body.choice2,
      choice3: req.body.choice3,
      choice4: req.body.choice4,
      choice5: req.body.choice5,
      _id: req.params.id
    })

    Student.findByIdAndUpdate(req.params.id, student_update)
    .then((results, err) => {
      if(err){
        res.render('error', {error: err})
      } else {
        res.redirect(student_update.url);
      }
    })
  }

exports.students_delete_get = function(req, res, next){

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
      res.render('admin_students_delete', {students: results.students, schools: results.schools, topics: results.topics});
  });
}

exports.students_delete_post = function(req, res, next) {

  Student.findByIdAndDelete(req.params.id)
  .exec(function(err){
    if (err){
      res.render('error',{errors: err})
    } else {
      res.redirect('/admin/students')
    }
  })

}

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


exports.schools_create_get = function(req, res, next){
  res.render('admin_schools_create');
}

exports.schools_create_post = (req, res, next) => {

    var school_create = new School({
      name: req.body.name
    })

    School.create(school_create)
    .then(function(results, err){
      if (err){
        res.render('error', {errors: err})
      } else {
        res.render('admin_schools_detail', {schools: results})
      }
    })
  }

exports.schools_update_get = function(req, res, next){
  
  School.findById(req.params.id)
  .then(function(results, err){
    if (err){
      res.render('error', {errors: err})
    } else {
      res.render('admin_schools_update', {schools: results})
    }
  })
}

exports.schools_update_post = (req, res, next) => {

    var school_update = new School({
      name: req.body.name,
      _id: req.params.id,
    })

    School.findByIdAndUpdate(req.params.id, school_update)
    .then(function(results, err){
      if (err){
        res.render('error', {errors: err})
      } else {
        res.render('admin_schools_detail', {schools: school_update})
      }
    })
  }

exports.schools_delete_get = function(req, res, next){
  School.findById(req.params.id)
  .then(function(results, err){
    if(err){
      res.render('error', {errors: err})
    } else {
      res.render('admin_schools_delete', {schools: results});
    }
  })
}

exports.schools_delete_post = (req, res, next) => {
    School.findByIdAndDelete(req.params.id)
    .exec(function(err){
      if(err){
        res.render('error', {errors: err})
      } else {
        res.redirect('/admin/schools');
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

  Topic.findById(req.params.id)
  .then(function(results, err){
    if(err){
      res.render('error', {errors: err})
    } else {
      res.render('admin_topics_detail', {topics: results});
    }
  })  
}

exports.topics_create_get = function(req, res, next){
  res.render('admin_topics_create');
}

exports.topics_create_post = (req, res, next) => {

    var topic_create = new Topic({
      title: req.body.title, 
      description: req.body.description
    })

    Topic.create(topic_create)
    .then(function(results, err){
      if (err){
        res.render('error', {errors: err})
      } else {
        res.render('admin_topics_detail', {topics: results})
      }
    })
  }

exports.topics_update_get = function(req, res, next){

  Topic.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err})
    } else {
      res.render('admin_topics_update', {topics: results});
    }
  })
}

exports.topics_update_post = (req, res) => {

    var topic_update = new Topic({
      title: req.body.title, 
      description: req.body.description,
      _id: req.params.id
    })

    Topic.findByIdAndUpdate(req.params.id, topic_update)
    .then((results, err) => {
      if (err) {
        res.render('error', {errors: err});
      } else {
        res.render('admin_topics_detail', {topics: topic_update});
      }
    })
  }

exports.topics_delete_get = (req, res) => {

  Topic.findById(req.params.id)
  .then((results, err) =>{
    if (err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_topics_delete', {topics: results});
    }
  })
}

exports.topics_delete_post = (req, res) => {
  
  Topic.findByIdAndDelete(req.params.id)
  .exec((err) => {
    if (err){
      res.render('error', {errors: err})
    } else {
      res.redirect('/admin/topics');
    }
  })
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

  Presenter.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_presenters_detail', {presenters: results})
    }
  })
}

exports.presenters_create_get = (req, res) => {

  res.render('admin_presenters_create');
}

exports.presenters_create_post = (req, res) => {

    var presenter_create = new Presenter({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      occupation: req.body.occupation,
      mainPhone: req.body.mainPhone,
      cellPhone: req.body.cellPhone,
      email: req.body.email
    })

    Presenter.create(presenter_create)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_presenters_detail', {presenters: presenters_create})
      }
    })
  }

exports.presenters_update_get = (req, res) => {

  Presenter.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_presenters_update', {presenters: results})
    }
  })
}

exports.presenters_update_post = (req, res) => {

    var presenter_update = new Presenter({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      occupation: req.body.occupation,
      mainPhone: req.body.mainPhone,
      cellPhone: req.body.cellPhone,
      email: req.body.email,
      _id: req.params.id
    })

    Presenter.findByIdAndUpdate(req.params.id, presenter_update)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_presenters_detail', {presenters: presenter_update});
      }
    })
  }

exports.presenters_delete_get = (req, res) => {

  Presenter.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_presenters_delete', {presenters: results});
    }
  })
}

exports.presenters_delete_post = (req, res) => {

  Presenter.findByIdAndDelete(req.params.id)
  .exec((err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.redirect('/admin/presenters');
    }
  })
}

//ROOMS

exports.rooms_list_get = (req, res) => {
  Room.find({})
  .sort({roomNum:'asc'})
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_rooms_list', {rooms: results})
    }
  })
}

exports.rooms_detail_get = (req, res) => {

  Room.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_rooms_detail', {rooms: results})
    }
  })
}

exports.rooms_create_get = (req, res) => {
  res.render('admin_rooms_create');
}

exports.rooms_create_post = (req, res) => {

    var room_create = new Room({
      roomNum: req.body.roomNum,
      building: req.body.building,
      capacity: req.body.capacity
    })

    Room.create(room_create)
    .then((results, err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_rooms_detail', {rooms: room_create})
      }
    })
  }

exports.rooms_update_get = (req, res) => {

  Room.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_rooms_update', {rooms: results})
    }
  })
}

exports.rooms_update_post = (req, res) => {

    var room_create = new Room({
      roomNum: req.body.roomNum,
      building: req.body.building,
      capacity: req.body.capacity,
      _id: req.params.id
    })

    Room.findByIdAndUpdate(req.params.id, room_create)
    .exec((err) => {
      if(err){
        res.render('error', {errors: err});
      } else {
        res.render('admin_rooms_detail', {rooms: room_create})
      }
    })
  }

exports.rooms_delete_get = (req, res) =>{

  Room.findById(req.params.id)
  .then((results, err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.render('admin_rooms_delete', {rooms: results})
    }
  })
}

exports.rooms_delete_post = (req, res) => {

  Room.findByIdAndDelete(req.params.id)
  .exec((err) => {
    if(err){
      res.render('error', {errors: err});
    } else {
      res.redirect('/admin/rooms');
    }
  })
}