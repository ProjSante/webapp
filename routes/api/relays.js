const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const User = require('../../models/User');

// @route 	PUT api/relay
// @desc		Add measurements from devices
// @access	Private

router.put('/', auth, async (req, res) => {
	const { id, pulse, oxygensat } = req.body;

	const measure = { id, pulse, oxygensat };
	try {
		const user = await User.findById(req.user.id);

		let resp = user.devices.find(device => {
			if (device.id === id) {
				return device.measures.unshift(measure);
			}
		});

		await user.save();

		res.status(200).json(resp);
	} catch {
		console.error(err.message);
		res.status(500).json({ errors: [{ msg: 'Server error' }] });
	}
});

// @route 	GET api/relays
// @desc		Get lattest measures from all relays
// @access	Private

router.get('/', auth, async (req, res) => {
	try {
		const user = await User.findById(req.user.id);

		let update = [];

		user.devices.map(device => {
			if (device.measures.length) update.push(device.measures[0]);
		});

		res.json(update);
	} catch (err) {
		console.error(err.message);
		res.status(500).json({ errors: [{ msg: 'Server error' }] });
	}
});

module.exports = router;