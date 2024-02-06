const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const BookingSchema = require('../schemas/BookingSchema');
const UserSchema = require('../schemas/UserSchema');
const ProductSchema = require('../schemas/ProductsSchema');

// !create User Collection
const bookingCollection = new mongoose.model('Booking', BookingSchema);
const userCollection = new mongoose.model('User', UserSchema);
const productsCollection = new mongoose.model('Product', ProductSchema);

// !get all booking data
router.get('/', async (req, res) => {
	try {
		const bookings = await bookingCollection.find().sort({_id: -1});
		if (bookings.length > 0) {
			res.status(200).json({
				message: 'success',
				data: bookings.reverse(),
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

// !get single booking data with booking id

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const bookingQuery = {_id: id};
		const booking = await bookingCollection.findOne(bookingQuery);
		if (booking._id) {
			res.status(200).json({
				message: 'success',
				data: booking,
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'there is an error in server',
		});
	}
});
// !get all booking data with user email
router.get('/all/:email', async (req, res) => {
	try {
		const email = req.params.email;
		const bookingQuery = {email: email};
		const booking = await bookingCollection.find(bookingQuery);
		if (booking.length > 0) {
			res.status(200).json({
				message: 'success',
				data: booking,
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'there is an error in server',
		});
	}
});
// !get all booking products with product ids
router.post('/products/all', async (req, res) => {
	try {
		const ids = req.body;

		const bookingQuery = {_id: {$in: ids}};
		const bookingProducts = await productsCollection.find(bookingQuery);
		if (bookingProducts.length > 0) {
			res.status(200).json({
				message: 'success',
				data: bookingProducts,
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		res.status(500).json({
			message: 'there is an error in server',
		});
	}
});

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
// !update booking data
router.put('/update/:id', async (req, res) => {
	try {
		const bookingId = req.params.id;
		const bookingData = req.body;
		const updateData = {
			$set: {
				products: bookingData.products,
				total: bookingData.total,
			},
		};
		// !update booking data
		const updatedBooking = await bookingCollection.updateOne({_id: bookingId}, updateData);
		if (updatedBooking.acknowledged) {
			res.status(200).json({
				message: 'success',
				data: updatedBooking,
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});

// !Delete Booking data
router.delete('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const deleteBooking = await bookingCollection.deleteOne({_id: id});
		if (deleteBooking.deletedCount > 0) {
			res.status(200).json({
				message: 'success',
				data: deleteBooking,
			});
		} else {
			res.status(404).json({
				message: 'Not Found',
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});

module.exports = router;
