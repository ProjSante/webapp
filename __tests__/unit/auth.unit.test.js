const { validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../../controllers/auth');
const httpMocks = require('node-mocks-http');
const authentication = require('../mocks/authentication.json');
const user = require('../mocks/user.json');

const User = require('../../models/User');

jwt.sign = jest.fn(() => this);

User.findById = jest.fn((id) => {
	if (id === user._id) {
		return user;
	} else {
		throw new Error('invalid token');
	}
});

User.findOne = jest.fn(({ email }) => {
	if (email === user.email) {
		return user;
	} else {
		throw new Error('invalid email');
	}
});

let req, res;
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	req.user = { id: '5db977aa4' };
});

describe('[Unit] => Controllers auth', () => {
	describe('auth.authUser', () => {
		it('Contains authUser function', (done) => {
			expect(typeof auth.authUser).toBe('function');
			done();
		});

		it('Fails when calling with bad email', async (done) => {
			// Bad email
			req.body = { email: 'bad@email.com' };
			await auth.authUser(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid email' } ]
			});
			done();
		});

		it('Calls User.findOne()', async (done) => {
			req.body = { email: 'brown@brh.com' };
			await auth.authUser(req, res);
			expect(User.findOne).toBeCalledWith({ email: req.body.email });
			done();
		});

		it('Fails when password do not match', async (done) => {
			req.body = { email: 'brown@brh.com' };
			bcrypt.compare = jest.fn(() => false);
			await auth.authUser(req, res);
			expect(res.statusCode).toBe(400);
			done();
		});

		it('Calls jwt.sign()', async (done) => {
			req.body = { email: 'brown@brh.com' };
			bcrypt.compare = jest.fn(() => true);
			await auth.authUser(req, res);
			expect(jwt.sign).toBeCalled();
			done();
		});
	});

	describe('auth.validateToken', () => {
		it('Contains validateToken function', (done) => {
			expect(typeof auth.validateToken).toBe('function');
			done();
		});

		it('Fails when calling with bad email', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await auth.validateToken(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid token' } ]
			});
			done();
		});

		it('Calls User.findById', async (done) => {
			await auth.validateToken(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});
	});
});
