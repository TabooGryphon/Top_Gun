// Full Documentation - https://www.turbo360.co/docs
const turbo = require('turbo360')({site_id: process.env.TURBO_APP_ID})
const vertex = require('vertex360')({site_id: process.env.TURBO_APP_ID})
const router = vertex.router()

const admin_controller = require('../controllers/adminController');
// Routes for admin functions

router.get('/', admin_controller.main);



module.exports = router
