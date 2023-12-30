const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const CategorySchema = new Schema({
	category_id: {
		type: Number,
		required: true,
	},
	name: {
		type: String,
		required: true,
	},
	image: {
		type: String,
		required: true,
	},
});

module.exports = CategorySchema;
