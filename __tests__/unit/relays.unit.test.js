jest.mock('../../middleware/auth', () => jest.fn((req, res, next) => next()));

const relays = require('../../controllers/relays');

describe('[Unit] => Controllers relays', () => {
	describe('relays.addMeasurement', () => {
		it('Contains addMeasurement function', (done) => {
			expect(typeof relays.addMeasurement).toBe('function');
			done();
		});
	});

	describe('relays.getMeasurements', () => {
		it('Contains getMeasurements function', (done) => {
			expect(typeof relays.getMeasurements).toBe('function');
			done();
		});
	});

	describe('relays.getDevices', () => {
		it('Contains getDevices function', (done) => {
			expect(typeof relays.getDevices).toBe('function');
			done();
		});
	});
});
