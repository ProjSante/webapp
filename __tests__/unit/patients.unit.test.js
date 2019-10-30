jest.mock('../../middleware/auth', () => jest.fn((req, res, next) => next()));

const patients = require('../../controllers/patients');

describe('[Unit] => Controllers patients', () => {
	describe('patients.patientAdmission', () => {
		it('Contains patientAdmission function', (done) => {
			expect(typeof patients.patientAdmission).toBe('function');
			done();
		});
	});

	describe('patients.editPatient', () => {
		it('Contains editPatient function', (done) => {
			expect(typeof patients.editPatient).toBe('function');
			done();
		});
	});

	describe('patients.getPatient', () => {
		it('Contains getPatient function', (done) => {
			expect(typeof patients.getPatient).toBe('function');
			done();
		});
	});

	describe('patients.deletePatient', () => {
		it('Contains deletePatient function', (done) => {
			expect(typeof patients.deletePatient).toBe('function');
			done();
		});
	});
});
