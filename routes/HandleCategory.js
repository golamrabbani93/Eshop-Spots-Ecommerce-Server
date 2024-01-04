const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const CategorySchema = require('../schemas/CategorySchema');

// !create NewArrivalProducts Collection
const categoryCollection = new mongoose.model('Category', CategorySchema);

router.get('/', async (req, res) => {
	try {
		const categories = await categoryCollection.find().sort({name: -1});
		if (categories.length > 0) {
			res.status(200).json({
				message: 'success',
				data: categories.reverse(),
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

module.exports = router;
