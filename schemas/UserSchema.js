const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
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
	},
	country: {
		type: String,
	},
	townCity: {
		type: String,
	},
	street: {
		type: String,
	},
});

module.exports = UserSchema;
