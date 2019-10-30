jest.mock('../../middleware/auth', () => jest.fn((req, res, next) => next()));

const users = require('../../controllers/users');

describe('[Unit] => Controllers users', () => {
	describe('users.registerUser', () => {
		it('Contains registerUser function', (done) => {
			expect(typeof users.registerUser).toBe('function');
			done();
		});
	});

	describe('users.updateUser', () => {
		it('Contains updateUser function', (done) => {
			expect(typeof users.updateUser).toBe('function');
			done();
		});
	});

	describe('users.deleteUser', () => {
		it('Contains deleteUser function', (done) => {
			expect(typeof users.deleteUser).toBe('function');
			done();
		});
	});
});
