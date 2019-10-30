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
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
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
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
	}
};

const getPatient = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const patient = user.devices.find(
			(device) => String(device._id) === String(req.params._id)
		);

		res.status(200).json(patient);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
	}
};

const deletePatient = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const removeIndex = user.devices.findIndex(
			(device) => String(device._id) === String(req.params._id)
		);

		user.devices.splice(removeIndex, 1);

		await user.save();

		res.status(200).json(user.devices);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [ { msg: 'Error connecting user' } ] });
	}
};

module.exports = { patientAdmission, editPatient, getPatient, deletePatient };
