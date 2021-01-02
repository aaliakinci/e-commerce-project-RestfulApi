const { json } = require('express');
const express = require('express');
const router = express.Router();

//Models
const Category = require('../Models/Category');
const Product = require('../Models/Product');
const Comment = require('../Models/Comment');


//Get All Category
router.get('/', (req, res,next) => {
	const promise = Category.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Get All Categories with products
router.get('/withProducts', (req, res,next) => {
	const promise = Category.aggregate([
		{
			$lookup: {
				from: 'products',
				localField: 'products',
				foreignField: '_id',
				as: 'products',
			},
		},
		{
			$unwind: {
				path: '$products',
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

//Create New Categories
router.post('/create', (req, res,next) => {
	const category = new Category(req.body);
	const promise = category.save();
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Get category by Id
router.get('/:category_id', (req, res,next) => {
	const promise = Category.findById(req.params.category_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Update Category by ID
router.put('/:category_id', (req, res,next) => {
	const promise = Category.findByIdAndUpdate(req.params.category_id, req.body, { new: true });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Delete Category by Id
router.delete('/:category_id', async (req, res,next) => {
	try {
		const { products } = await Category.findById(req.params.category_id);
		for (let i in products) {
			await deleteProducts(products[i].toString());
		}
		await Category.findByIdAndRemove(req.params.category_id);
		res.json({ status: 1 });
	} catch (error) {
		next(error);
	}
});

async function deleteProducts(product_id) {
	try {
		let comment_id_arr = [];
		comment_id_arr = await deleteProductFromComments(product_id);
		for (let i in comment_id_arr) {
			await deleteProductCommentsFromUser(comment_id_arr[i]);
		}
		await Product.findByIdAndRemove(product_id);
	} catch (error) {
		throw error;
	}
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

module.exports = router;
