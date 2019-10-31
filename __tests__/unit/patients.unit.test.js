const patients = require('../../controllers/patients');
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

describe('[Unit] => Controllers patients', () => {
	describe('patients.patientAdmission', () => {
		it('Contains patientAdmission function', (done) => {
			expect(typeof patients.patientAdmission).toBe('function');
			done();
		});

		it('Fails to call inexistent user ', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await patients.patientAdmission(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid token' } ]
			});
			done();
		});

		it('Calls User.findById()', async (done) => {
			await patients.patientAdmission(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});
	});

	describe('patients.editPatient', () => {
		it('Contains editPatient function', (done) => {
			expect(typeof patients.editPatient).toBe('function');
			done();
		});

		it('Fails to call inexistent user ', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await patients.editPatient(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid token' } ]
			});
			done();
		});

		it('Calls User.findById()', async (done) => {
			await patients.editPatient(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});
	});

	describe('patients.getPatient', () => {
		it('Contains getPatient function', (done) => {
			expect(typeof patients.getPatient).toBe('function');
			done();
		});

		it('Fails to call inexistent user ', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await patients.getPatient(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid token' } ]
			});
			done();
		});

		it('Calls User.findById()', async (done) => {
			await patients.getPatient(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});

		it('Succeds to retrieve patient', async (done) => {
			// __tests__/mocks/user.json 'Jack Sparrow'
			req.params = { _id: '100' };
			await patients.getPatient(req, res);
			expect(res.statusCode).toBe(200);
			done();
		});

		it('Fails to retrieve non existing patient', async (done) => {
			// __tests__/mocks/user.json _id = 700 do not exist
			req.params = { _id: '700' };
			await patients.getPatient(req, res);
			expect(res.statusCode).toBe(404);
			done();
		});

		it('Returns patient by Id', async (done) => {
			// __tests__/mocks/user.json 'Jack Sparrow'
			req.params = { _id: '100' };
			await patients.getPatient(req, res);
			expect(res._getJSONData()).toStrictEqual(user.devices[0]);
			done();
		});
	});

	describe('patients.deletePatient', () => {
		it('Contains deletePatient function', (done) => {
			expect(typeof patients.deletePatient).toBe('function');
			done();
		});

		it('Fails to call inexistent user ', async (done) => {
			// Bad user id
			req.user = { id: '101010101' };
			await patients.deletePatient(req, res);
			expect(res.statusCode).toBe(500);
			expect(res._getJSONData()).toEqual({
				errors : [ { msg: 'invalid token' } ]
			});
			done();
		});

		it('Calls User.findById()', async (done) => {
			await patients.deletePatient(req, res);
			expect(User.findById).toBeCalledWith(req.user.id);
			done();
		});

		it('Fails to retrieve non existing patient', async (done) => {
			// __tests__/mocks/user.json _id = 700 do not exist
			req.params = { _id: '700' };
			await patients.deletePatient(req, res);
			expect(res.statusCode).toBe(404);
			done();
		});
	});
});
