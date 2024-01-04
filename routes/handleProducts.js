const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

// !import  Schema
const ProductSchema = require('../schemas/ProductsSchema');

// !create NewArrivalProducts Collection
const productsCollection = new mongoose.model('Product', ProductSchema);
router.get('/', async (req, res) => {
	try {
		const query = req.query;
		// !get only new arrival products
		if (query.status) {
			const newArrivalProducts = await productsCollection.find(query);
			if (newArrivalProducts.length > 0) {
				res.status(200).json({
					message: 'success',
					data: newArrivalProducts,
				});
				return;
			} else {
				return res.status(404).json({
					message: 'Not Found',
					data: 0,
				});
			}
		}
		// !get best seller products
		if (query.bestSeller) {
			const bestSeller = await productsCollection.find({best_seller: true});
			if (bestSeller.length > 0) {
				return res.status(200).json({
					message: 'success',
					data: bestSeller,
				});
			} else {
				return res.status(404).json({
					message: 'Not Found',
					data: 0,
				});
			}
		}
		// !get Category  products with category name
		if (query.categoryName !== 'undefined') {
			const categoryProduct = await productsCollection.find({category_name: query.categoryName});
			if (categoryProduct.length > 0) {
				return res.status(200).json({
					message: 'success',
					data: categoryProduct,
				});
			} else {
				return res.status(404).json({
					message: 'Not Found',
					data: 0,
				});
			}
		}
		// !get all products
		const allProducts = await productsCollection.find();
		if (allProducts.length > 0) {
			return res.status(200).json({
				message: 'success',
				data: allProducts,
			});
		} else {
			return res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});

// !get single peroduct by product id
router.get('/:id', async (req, res) => {
	try {
		const id = req.params.id;
		const productQuery = {_id: id};
		const product = await productsCollection.findOne(productQuery);
		if (product._id) {
			return res.status(200).json({
				message: 'success',
				data: product,
			});
		} else {
			return res.status(404).json({
				message: 'Not Found',
				data: 0,
			});
		}
	} catch (error) {
		return res.status(500).json({message: 'there is an error in server'});
	}
});

module.exports = router;
