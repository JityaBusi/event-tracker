const express = require('express');
const router = express.Router();

const { createActivity } = require('../controllers/activityController');
const rateLimiter = require('../middlewares/rateLimiter');

router.post('/activities', rateLimiter, createActivity);

module.exports = router;
