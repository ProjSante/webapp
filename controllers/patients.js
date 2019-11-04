const { validationResult } = require('express-validator');

const User = require('../models/User');

const patientAdmission = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { firstname, lastname, observation } = req.body;

		const patient = {
			firstname,
			lastname,
			observation
		};

		const user = await User.findById(req.user.id);

		const count = user.devices.push({ patient });

		await user.save();

		res.status(200).json(user.devices[count - 1]);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const editPatient = async (req, res) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}
	try {
		const { status, firstname, lastname, observation } = req.body;

		const user = await User.findById(req.user.id);

		const patient = {
			status,
			firstname,
			lastname,
			observation
		};

		const editIndex = user.devices.findIndex(
			(device) => String(device._id) === String(req.params._id)
		);

		user.devices.splice(editIndex, 1, { patient });

		await user.save();

		res.status(200).json(user.devices[editIndex]);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const getPatient = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const patient = user.devices.find(
			(device) => String(device._id) === String(req.params._id)
		);

		if (!patient) {
			return res.status(404).json({ errors: [ { msg: 'Patient not found' } ] });
		}
		res.status(200).json(patient);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const deletePatient = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const removeIndex = user.devices.findIndex(
			(device) => String(device._id) === String(req.params._id)
		);

		if (removeIndex === -1) {
			return res.status(404).json({ errors: [ { msg: 'Patient not found' } ] });
		}

		user.devices.splice(removeIndex, 1);

		await user.save();

		res.status(200).json(user.devices);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

module.exports = { patientAdmission, editPatient, getPatient, deletePatient };
