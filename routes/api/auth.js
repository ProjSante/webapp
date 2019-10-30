const express = require('express');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const router = express.Router();

const { validateToken, authUser } = require('../../controllers/auth');

// @route 	GET api/auth
// @desc		Validate token to authenticate access
// @access	Private

router.get('/', auth, validateToken);

// @route 	POST api/auth
// @desc		Authenticate user and get token
// @access	Private

router.post(
	'/',
	[
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password required').exists()
	],
	authUser
);

module.exports = router;
