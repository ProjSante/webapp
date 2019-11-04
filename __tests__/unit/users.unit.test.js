const users = require('../../controllers/users');
const user = require('../mocks/user.json');
const httpMocks = require('node-mocks-http');
const User = require('../../models/User');

User.findByIdAndRemove = jest.fn();

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
	req.body = { email: 'brown@brh.com' };
});

describe('[Unit] => Controllers users', () => {
	describe('users.registerUser', () => {
		it('Contains registerUser function', (done) => {
			expect(typeof users.registerUser).toBe('function');
			done();
		});

		it('Calls User.findOne()', async (done) => {
			await users.registerUser(req, res);
			expect(User.findOne).toBeCalledWith({ email: req.body.email });
			done();
		});

		it('Fails to register when email already exists', async (done) => {
			await users.registerUser(req, res);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'User already exists' } ]
			});
			done();
		});
	});

	describe('users.updateUser', () => {
		it('Contains updateUser function', (done) => {
			expect(typeof users.updateUser).toBe('function');
			done();
		});

		it('Calls User.findOne()', async (done) => {
			await users.updateUser(req, res);
			expect(User.findOne).toBeCalledWith({ email: req.body.email });
			done();
		});

		it('Fails when calling with bad email', async (done) => {
			// Bad email
			req.body = { email: 'bad@email.com' };
			await users.updateUser(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid email' } ]
			});
			done();
		});
	});

	describe('users.deleteUser', () => {
		it('Contains deleteUser function', (done) => {
			expect(typeof users.deleteUser).toBe('function');
			done();
		});

		it('Calls User.findByIdAndRemove()', async (done) => {
			await users.deleteUser(req, res);
			expect(User.findByIdAndRemove).toBeCalledWith(req.user.id);
			expect(res.statusCode).toBe(200);
			done();
		});
	});
});
