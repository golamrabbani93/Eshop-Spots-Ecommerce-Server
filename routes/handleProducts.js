const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const ProductSchema = require('../schemas/ProductsSchema');

// !create NewArrivalProducts Collection
const productsCollection = new mongoose.model('Product', ProductSchema);
router.get('/', async (req, res) => {
	try {
		const newArrivalProducts = await productsCollection.find();
		if (newArrivalProducts.length > 0) {
			res.status(200).json({
				message: 'success',
				data: newArrivalProducts,
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

router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const productQuery = {_id: id};
		const product = await productsCollection.findOne(productQuery);
		if (product._id) {
			res.status(200).json({
				message: 'success',
				data: product,
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
