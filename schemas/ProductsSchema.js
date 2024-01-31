const mongoose = require('mongoose');

const ProductsSchema = new mongoose.Schema({
	img: {
		type: String,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	rating: {
		type: Number,
	},
	ratingsCount: {
		type: Number,
	},

	main_price: {
		type: Number,
		required: true,
	},
	discount_price: {
		type: Number,
		required: true,
	},
	stock: {
		type: Number,
		required: true,
	},
	sold: {
		type: Number,
	},
	status: {
		type: String,
	},
	quantity: {
		type: Number,
	},
	description: {
		type: String,
		required: true,
	},
});
module.exports = ProductsSchema;
