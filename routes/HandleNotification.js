const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//!import  Schema
const BookingSchema = require('../schemas/BookingSchema');

// !create Notification Collection
const notificationCollection = mongoose.model('Notification', BookingSchema);
//* get all notification data
router.get('/', async (req, res) => {
	try {
		const allNotification = await notificationCollection.find().sort({_id: -1});
		if (allNotification.length > 0) {
			res.status(200).json({
				message: 'success',
				data: allNotification.reverse(),
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});
// !delete all notification data
router.delete('/', async (req, res) => {
	try {
		const deletedNotification = await notificationCollection.deleteMany();
		if (deletedNotification.deletedCount > 0) {
			res.status(200).json({
				message: 'success',
				data: deletedNotification,
			});
		} else {
			res.status(404).json({
				message: 'Unable to delete notification data',
			});
		}
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});
module.exports = router;
// Path: routes/HandlePayment.js
