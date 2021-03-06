const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

const User = require('../models/User');

const validateToken = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		user.password = undefined;

		res.status(200).json(user);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const authUser = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	// Extract data sent through body of request
	const { email, password } = req.body;

	try {
		// Check if email exists
		let user = await User.findOne({ email });
		let pwdMatch = null;

		if (user) {
			pwdMatch = await bcrypt.compare(password, user.password);
		}

		(!user || !pwdMatch) &&
			res.status(400).json({ errors: [ { msg: 'Invalid credentials' } ] });

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

module.exports = { validateToken, authUser };
