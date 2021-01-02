const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');


//Middleware
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const adminAuthentication = require('../middleware/adminAuthenticationMiddleware');

//Models
const Product = require('../Models/Product');
const Category = require('../Models/Category');
const Comment = require('../Models/Comment');
const User = mongoose.model('user');
//Get All Products
router.get('/', (req, res,next) => {
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
			next(err);
		});
});

//Create new Product
router.post('/create',[authenticationMiddleware,adminAuthentication], (req, res,next) => {
	const product = new Product(req.body);
	const promise = product.save();

	promise
		.then((data) => {
			const category_id = req.body.category_id;
			addProductThereCategory(category_id, data);
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Get Last Uploaded Product
router.get('/lastProducts', (req, res,next) => {
	const promise = Product.find({}).sort({ createAt: -1 });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Get Product Sort purchaseQuantity
router.get('/purchaseQuantity', (req, res,next) => {
	const promise = Product.find({}).sort({ purchaseQuantity: -1 });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

// Get Product By CategoryId
router.get('/:category_id', (req, res,next) => {
	const promise = Product.find({ category_id: req.params.category_id });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Get Product By Id
router.get('/:product_id', (req, res,next) => {
	const promise = Product.findById(req.params.product_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Update Product By Id
router.put('/:product_id',[authenticationMiddleware,adminAuthentication], (req, res,next) => {
	const promise = Product.findByIdAndUpdate(req.params.product_id, req.body, { new: true });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Remove Product By Id
router.delete('/:product_id',[authenticationMiddleware,adminAuthentication], async (req, res,next) => {
	try {
		let comment_id_arr = [];
		await deleteProductFromCategory(req.params.product_id);
		comment_id_arr = await deleteProductFromComments(req.params.product_id);

		for (let i in comment_id_arr) {
			await deleteProductCommentsFromUser(comment_id_arr[i]);
		}
		await Product.findByIdAndRemove(req.params.product_id);
		res.json({ status: 1 });
	} catch (error) {
		next(error);
	}
});

//Function Area

//Remove Product From Category

async function deleteProductFromCategory(product_id) {
	const { category_id } = await Product.findById(product_id);
	return Category.findByIdAndUpdate(category_id, { $pull: { products: product_id } });
}
async function deleteProductFromComments(product_id) {
	const comments = await Comment.find({});
	forUsers = [];
	for (let i in comments) {
		if (comments[i].product_id == product_id) {
			forUsers.push(comments[i]._id);
			const promise = Comment.findByIdAndRemove(comments[i]._id);
			promise
				.then((data) => {
					data.save();
				})
				.catch((err) => {
					throw err;
				});
		}
	}
	return forUsers;
}
async function deleteProductCommentsFromUser(comment_id) {
	const users = await User.find({});
	for (let i in users) {
		const promise = User.findByIdAndUpdate(users[i]._id.toString(), {
			$pull: { comments: comment_id },
		});
		promise
			.then((data) => {
				data.save();
			})
			.catch((err) => {
				throw err;
			});
	}
}

//addProduct Category
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
