// jest.mock('../../middleware/auth', () => jest.fn((req, res, next) => next()));

// jest.mock('../../models/User', () => {
// 	return {
// 		findById : jest.fn((_id) => this),
// 		select   : jest.fn(([ a, b ]) => this)
// 	};
// });

const request = require('supertest');
const express = require('express');
const app = express();

app.use(express.json());

app.use('/', require('./auth'));

describe('[Integration] => API api/auth', () => {
	describe('POST api/auth', () => {
		test('Fail without email and password formData', async (done) => {
			const response = await request(app).post('/');
			expect(response.text).toEqual(
				JSON.stringify({
					errors : [
						{
							msg      : 'Please include valid e-mail',
							param    : 'email',
							location : 'body'
						},
						{
							msg      : 'Password required',
							param    : 'password',
							location : 'body'
						}
					]
				})
			);
			expect(response.statusCode).toBe(400);
			done();
		});

		test('Fail without password formData', async (done) => {
			const response = await request(app)
				.post('/')
				.type('application/json')
				.send({ email: 'adam@gmail.com' });
			expect(response.text).toEqual(
				JSON.stringify({
					errors : [
						{
							msg      : 'Password required',
							param    : 'password',
							location : 'body'
						}
					]
				})
			);
			expect(response.statusCode).toBe(400);
			done();
		});

		test('Fail without email formData', async (done) => {
			const response = await request(app)
				.post('/')
				.type('application/json')
				.send({ password: 'adam123!' });
			expect(response.text).toEqual(
				JSON.stringify({
					errors : [
						{
							msg      : 'Please include valid e-mail',
							param    : 'email',
							location : 'body'
						}
					]
				})
			);
			expect(response.statusCode).toBe(400);
			done();
		});
	});

	describe('GET api/auth', () => {
		test('Fail with non valid auth token', async (done) => {
			const response = await request(app).get('/').set({
				'content-type' : 'application/json',
				'x-auth-token' : 'token.not.valid'
			});
			expect(response.text).toEqual(
				JSON.stringify({
					errors : [
						{
							msg : 'invalid token'
						}
					]
				})
			);
			expect(response.statusCode).toBe(401);
			done();
		});
	});
});
