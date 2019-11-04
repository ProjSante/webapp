module.exports = jest.fn((req, res, next) => {
	return next();
});
