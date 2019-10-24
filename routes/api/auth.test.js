const express = require('express');
const app = express();
const request = require('supertest');

app.use('/', require('./auth'));

describe('Auth API', () => {
	test('GET should fail without auth', (done) => {
		request(app).get('/').then((response) => {
			expect(response.statusCode).toBe(401);
			done();
		});
	});
});
