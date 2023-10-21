const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const BookingSchema = require('../schemas/BookingSchema');
const UserSchema = require('../schemas/UserSchema');

// !create User Collection
const bookingCollection = mongoose.model('Booking', BookingSchema);
const userCollection = mongoose.model('User', UserSchema);

router.get('/', async (req, res) => {});
router.post('/', async (req, res) => {
	try {
		const bookingData = req.body;
		// ! user data update in database

		// !find user in database
		const user = await userCollection.findOne({email: bookingData.email});
		const userUpdateData = {
			$set: {
				phone: bookingData.phone,
				country: bookingData.country,
				townCity: bookingData.townCity,
				street: bookingData.street,
			},
		};
		if (user._id) {
			// !update user data in database if user exits
			const updatedUser = await userCollection.updateOne(
				{email: bookingData.email},
				userUpdateData,
			);
			if (updatedUser.acknowledged) {
				// !save booking data in database if user update success
				const booking = new bookingCollection(bookingData);
				const savedBooking = await booking.save();
				if (savedBooking._id) {
					res.status(200).json({
						message: 'success',
						bookingId: savedBooking._id,
					});
				} else {
					res.status(500).json({
						message: 'there is an error in server',
					});
				}
			}
		} else {
			res.status(500).json({message: 'there is an error in server'});
		}
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});

module.exports = router;
