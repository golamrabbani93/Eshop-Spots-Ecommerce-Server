const mongoose = require('mongoose');

const PaymentSchema = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	transectionId: {
		type: String,
		required: true,
	},
	cardNumber: {
		type: String,
		required: true,
	},
	bookingId: {
		type: mongoose.Types.ObjectId,
		ref: 'booking',
	},
});

module.exports = PaymentSchema;
