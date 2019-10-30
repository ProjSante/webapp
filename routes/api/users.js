const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check } = require('express-validator');

const {
	registerUser,
	updateUser,
	deleteUser
} = require('../../controllers/users');

// @route 	POST api/users
// @desc		Register user
// @access	Public

router.post(
	'/',
	[
		check('firstname', 'Name is required').not().isEmpty(),
		check('lastname', 'Surname is required').not().isEmpty(),
		check('institution', 'Institution is required').not().isEmpty(),
		check('jobtitle', 'Job title is required').not().isEmpty(),
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password: 5+ charcters').isLength({ min: 5 })
	],
	registerUser
);

// @route 	PUT api/users
// @desc		Update user
// @access	Private

router.put(
	'/',
	auth,
	[
		check('firstname', 'Name is required').not().isEmpty(),
		check('lastname', 'Surname is required').not().isEmpty(),
		check('institution', 'Institution is required').not().isEmpty(),
		check('jobtitle', 'Job title is required').not().isEmpty(),
		check('email', 'Please include valid e-mail').isEmail(),
		check('password', 'Password Required').isLength({ min: 5 })
	],
	updateUser
);

// @route 	DELETE api/users
// @desc		Delete user
// @access	Private

router.delete('/', auth, deleteUser);

module.exports = router;
