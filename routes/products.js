const express = require('express');
const router = express.Router();
//Models
const Product = require('../Models/Product');
const Category = require('../Models/Category');

//Get All Products
router.get('/', (req, res) => {
	const promise = Product.aggregate([
		{
			$lookup: {
				from: 'category',
				localField: 'category_id',
				foreignField: '_id',
				as: 'category',
			},
		},
		{
			$unwind: {
				path: '$category',
				preserveNullAndEmptyArrays: true,
			},
		},
	]);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Create new Product
router.post('/create', (req, res) => {
	const product = new Product(req.body);
	const promise = product.save();

	promise
		.then((data) => {
			const category_id = req.body.category_id;
			addProductThereCategory(category_id, data);
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Get Last Uploaded Product
router.get('/lastProducts', (req, res) => {
	const promise = Product.find({}).sort({ createAt: -1 });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Get Product Sort purchaseQuantity
router.get('/purchaseQuantity', (req, res) => {
	const promise = Product.find({}).sort({ purchaseQuantity: -1 });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

// Get Product By CategoryId
router.get('/:category_id', (req, res) => {
	const promise = Product.find({ category_id: req.params.category_id });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Get Product By Id
router.get('/:product_id', (req, res) => {
	const promise = Product.findById(req.params.product_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Update Product By Id
router.put('/:product_id', (req, res) => {
	const promise = Product.findByIdAndUpdate(req.params.product_id, req.body, { new: true });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Remove Product By Id
router.delete('/:product_id', (req, res) => {
	const promise = Product.findByIdAndRemove(req.params.product_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Function Area

const addProductThereCategory = (category_id, product) => {
	const promise = Category.findOne({ _id: category_id });
	promise
		.then((data) => {
			const productId = product._id;
			data.products.push(productId.toString());
			data.save();
		})
		.catch((err) => {
			throw err;
		});
};

module.exports = router;
