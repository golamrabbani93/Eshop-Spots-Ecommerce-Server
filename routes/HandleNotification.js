const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//!import  Schema
const BookingSchema = require('../schemas/BookingSchema');

// !create Notification Collection
const notificationCollection = mongoose.model('Notification', BookingSchema);
router.get('/', async (req, res) => {
	res.send('notification route');
});
module.exports = router;
// Path: routes/HandlePayment.js
