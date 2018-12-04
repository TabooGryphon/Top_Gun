// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const admin_controller = require('../controllers/adminController');
// Routes for admin functions

router.get('/', admin_controller.main);

router.get('/students', admin_controller.students_get);

router.get('/schools', admin_controller.schools_get);

router.get('/topics', admin_controller.topics_get);

router.get('/presenters', admin_controller.presenters_get);

module.exports = router
