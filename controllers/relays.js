const User = require('../models/User');

const addMeasurement = async (req, res) => {
	const { id, pulse, oxygensat } = req.body;

	const measure = { id, pulse, oxygensat };
	try {
		const user = await User.findById(req.user.id);

		let resp = user.devices.find((device) => {
			if (device.id === id) {
				return device.measures.unshift(measure);
			}
		});

		await user.save();

		res.status(200).json(resp);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const getMeasurements = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		res.json(user.devices);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

const getDevices = async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		const ids = user.devices.map((device) => {
			return { id: device._id };
		});

		res.json(ids);
	} catch (err) {
		res.status(500).json({ errors: [ { msg: err.message } ] });
	}
};

module.exports = { addMeasurement, getMeasurements, getDevices };
