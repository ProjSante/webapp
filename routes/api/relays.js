const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();

const {
	addMeasurement,
	getMeasurements,
	getDevices
} = require('../../controllers/relays');

// @route 	PUT api/relay
// @desc		Add measurements from devices
// @access	Private

router.put('/', auth, addMeasurement);

// @route 	GET api/relays
// @desc		Vector with patient objects from all relays
// @access	Private

router.get('/', auth, getMeasurements);

/**
 * Vector with ids objects from all relays
 * 
 * @route 	GET api/relays/devices
 * @access	Private
 */

router.get('/devices', auth, getDevices);

module.exports = router;
