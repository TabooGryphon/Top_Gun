// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const admin_controller = require('../controllers/adminController');
// Routes for admin functions

router.get('/', admin_controller.main);

//STUDENTS

router.get('/students', admin_controller.students_list_get);

router.get('/students/create', admin_controller.students_create_get);

router.post('/students/create', admin_controller.students_create_post);

router.get('/students/:id/update', admin_controller.students_update_get);

router.post('/students/:id/update', admin_controller.students_update_post);

//router.get('/students/:id/delete', admin_controller.student_delete_get);

//router.post('/students/:id/delete', admin_controller.students_delete_post);

router.get('/students/:id', admin_controller.students_detail_get);

//SCHOOLS

router.get('/schools', admin_controller.schools_list_get);

router.get('/schools/:id', admin_controller.schools_detail_get);

//TOPICS

router.get('/topics', admin_controller.topics_list_get);

router.get('/topics/:id', admin_controller.topics_detail_get);

//PRESENTERS

router.get('/presenters', admin_controller.presenters_list_get);

router.get('/topics/:id', admin_controller.presenters_detail_get);

module.exports = router
