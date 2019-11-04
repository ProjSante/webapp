const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const keys = require('../config/keys');
const jwt = require('jsonwebtoken');

const User = require('../models/User');

const registerUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	// Extract data sent through body of request
	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		email,
		password,
		preferences
	} = req.body;

	try {
		// Check if email exists
		let user = await User.findOne({ email });
		if (user) {
			return res
				.status(400)
				.json({ errors: [ { msg: 'User already exists' } ] });
		}

		// Start creation of new user
		user = new User({
			firstname,
			lastname,
			institution,
			jobtitle,
			email,
			password,
			preferences
		});

		// Encrypt password
		const salt = await bcrypt.genSalt(10);
		user.password = await bcrypt.hash(password, salt);

		// Save user to DB
		await user.save();

		// Generate JWT
		// const payload = {
		// 	user: { id: user.id }
		// };
		jwt.sign(
			{ user: { id: user.id } },
			keys.jwtSecret,
			{ expiresIn: '365 days' },
			(err, token) => {
				if (err) throw err;
				res.json({ token });
			}
		);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const updateUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	// Extract data sent through body of request
	const {
		firstname,
		lastname,
		institution,
		jobtitle,
		preferences,
		email,
		password
	} = req.body;

	try {
		// Validate User and Permission
		// Check if email exists
		let validate = await User.findOne({ email });
		let pwdMatch = null;

		if (validate) {
			pwdMatch = await bcrypt.compare(password, validate.password);
		}

		if (!validate || !pwdMatch) {
			return res
				.status(400)
				.json({ errors: [ { msg: 'Invalid credentials' } ] });
		}

		// Start creation of new user
		const update = {
			firstname,
			lastname,
			institution,
			jobtitle,
			preferences
		};

		// Save user to DB
		let user = await User.findOneAndUpdate({ email }, update, { new: true });

		jwt.sign(
			{ user: { id: user.id } },
			keys.jwtSecret,
			{ expiresIn: '365 days' },
			(err, token) => {
				if (err) throw err;
				res.json({ user });
			}
		);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const deleteUser = async (req, res) => {
	try {
		// Find and remove
		await User.findByIdAndRemove(req.user.id);

		return res.status(200).json({ msg: 'User Removed' });
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

module.exports = { registerUser, updateUser, deleteUser };
