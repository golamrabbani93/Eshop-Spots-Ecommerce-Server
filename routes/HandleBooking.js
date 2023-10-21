const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const BookingSchema = require('../schemas/BookingSchema');

// !create User Collection
const bookingCollection = mongoose.model('Booking', BookingSchema);

router.get('/', async (req, res) => {});
router.post('/', async (req, res) => {
	const bookingData = req.body;
	console.log('🚀🚀: bookingData', bookingData);
});

module.exports = router;
