const express = require('express');
const auth = require('../../middleware/auth');
const { check } = require('express-validator');
const router = express.Router();

const {
	patientAdmission,
	editPatient,
	getPatient,
	deletePatient
} = require('../../controllers/patients');

// @route 	POST api/patients
// @desc		Patient admission
// @access	Private

router.post(
	'/',
	auth,
	[
		check('firstname', 'First name required').not().isEmpty(),
		check('lastname', 'Last name required').not().isEmpty()
	],
	patientAdmission
);

// @route 	PUT api/patients/patient_id
// @desc		Edit patient Information
// @access	Private

router.put(
	'/:_id',
	auth,
	[
		check('status', 'Status is required').isString(),
		check('firstname', 'First name required').not().isEmpty(),
		check('lastname', 'Last name required').not().isEmpty()
	],
	editPatient
);

// @route 	GET api/patients/patient_id
// @desc		Get all patient information
// @access	Private

router.get('/:_id', auth, getPatient);

// @route 	DELETE api/patients/patient_id
// @desc		Delete all patient information
// @access	Private

router.delete('/:_id', auth, deletePatient);

module.exports = router;
