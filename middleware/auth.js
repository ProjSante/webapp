const jwt = require('jsonwebtoken');
const keys = require('../config/keys');

module.exports = (req, res, next) => {
	// Get token from header
	const token = req.header('x-auth-token');

	// Handle a bad token
	if (!token)
		return res
			.status(401)
			.json({ errors: [ { msg: 'Authorization denied' } ] });

	// Verify token
	try {
		// Decode token and set req.user for the app
		const decoded = jwt.verify(token, keys.jwtSecret);
		req.user = decoded.user;

		next();
	} catch (err) {
		res.status(401).json({ errors: [ { msg: err.message } ] });
	}
};
