const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const STRIPE_SECRET_KEY = process.env.STRIPE_SECRET_KEY;
// !stripe payment gateway api key
const stripe = require('stripe')(STRIPE_SECRET_KEY);

// !import  Schema
const PaymentSchema = require('../schemas/PaymentSchema');
const BookingSchema = require('../schemas/BookingSchema');

// !create Payment Collection
const paymentCollection = mongoose.model('Payment', PaymentSchema);
const bookingCollection = mongoose.model('Booking', BookingSchema);
router.get('/', async (req, res) => {
	res.send('payment route');
});

router.post('/', async (req, res) => {
	try {
		const paymentData = req.body;
		const {bookingId} = paymentData;
		// !update payment status in booking collection
		const bookingQuery = {_id: bookingId};
		const bookingUpdateData = {
			$set: {
				paymentStatus: 'Paid',
			},
		};
		const updatedBooking = await bookingCollection.updateOne(bookingQuery, bookingUpdateData);
		if (updatedBooking.acknowledged) {
			// !save payment data in database if booking update success
			const payment = new paymentCollection(paymentData);
			const savedPayment = await payment.save();
			if (savedPayment._id) {
				res.status(200).json({
					message: 'success',
				});
			} else {
				res.status(500).json({
					message: 'there is an error in server',
				});
			}
		}
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});

router.post('/create-payment-intent', async (req, res) => {
	try {
		const {total} = req.body;

		// !calculate payment amount
		const newAmount = total * 100;
		// Create a PaymentIntent with the order amount and currency
		const paymentIntent = await stripe.paymentIntents.create({
			amount: newAmount,
			currency: 'usd',
			// In the latest version of the API, specifying the `automatic_payment_methods` parameter is optional because Stripe enables its functionality by default.
			automatic_payment_methods: {
				enabled: true,
			},
		});

		res.send({
			clientSecret: paymentIntent.client_secret,
		});
	} catch (error) {
		res.status(500).json({message: 'there is an error in server'});
	}
});

module.exports = router;
