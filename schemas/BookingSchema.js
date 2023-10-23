const mongoose = require('mongoose');

const BookingSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	email: {
		type: String,
		required: true,
	},
	phone: {
		type: String,
		required: true,
	},
	country: {
		type: String,
		required: true,
	},
	townCity: {
		type: String,
		required: true,
	},
	street: {
		type: String,
		required: true,
	},
	orderNote: {
		type: String,
	},
	products: {
		type: Array,
		required: true,
	},
	total: {
		type: Number,
		required: true,
	},
	paymentStatus: {
		type: String,
	},
});

module.exports = BookingSchema;
