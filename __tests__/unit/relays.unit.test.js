const relays = require('../../controllers/relays');
const httpMocks = require('node-mocks-http');
const User = require('../../models/User');
const user = require('../mocks/user.json');

User.findById = jest.fn((id) => {
	if (id === user._id) {
		return user;
	} else {
		throw new Error('invalid token');
	}
});

let req, res;
beforeEach(() => {
	req = httpMocks.createRequest();
	res = httpMocks.createResponse();
	req.user = { id: '5db977aa4' };
});

describe('[Unit] => Controllers relays', () => {
	describe('relays.addMeasurement', () => {
		it('Contains addMeasurement function', (done) => {
			expect(typeof relays.addMeasurement).toBe('function');
			done();
		});

		it('Calls User.findById()', async (done) => {
			await relays.addMeasurement(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});
	});

	describe('relays.getMeasurements', () => {
		it('Contains getMeasurements function', (done) => {
			expect(typeof relays.getMeasurements).toBe('function');
			done();
		});

		it('Calls User.findById()', async (done) => {
			await relays.getMeasurements(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			expect(res.statusCode).toBe(200);
			done();
		});

		it('Fails when calling inexistent user', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await relays.getMeasurements(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			expect(res.statusCode).toBe(500);
			done();
		});
	});

	describe('relays.getDevices', () => {
		it('Contains getDevices function', (done) => {
			expect(typeof relays.getDevices).toBe('function');
			done();
		});

		it('Calls User.findById()', async (done) => {
			await relays.getDevices(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			expect(res.statusCode).toBe(200);
			done();
		});

		it('Fails when calling inexistent user', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await relays.getDevices(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			expect(res.statusCode).toBe(500);
			done();
		});
	});
});
