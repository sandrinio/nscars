const express = require('express');
const router = express.Router();
const passport = require("passport");
const middleware = require("../middleware");
const User = require('../models/User');

router.get('/login', (req, res) => {
	 res.send('login route')
})

module.exports = router;