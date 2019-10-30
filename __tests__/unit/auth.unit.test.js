jest.mock('../../middleware/auth', () => jest.fn((req, res, next) => next()));

const auth = require('../../controllers/auth');

describe('[Unit] => Controllers auth', () => {
	describe('auth.authUser', () => {
		it('Contains authUser function', (done) => {
			expect(typeof auth.authUser).toBe('function');
			done();
		});
	});

	describe('auth.validateToken', () => {
		it('Contains validateToken function', (done) => {
			expect(typeof auth.validateToken).toBe('function');
			done();
		});
	});
});
