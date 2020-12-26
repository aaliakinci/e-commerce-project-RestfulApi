const express = require('express');
const router = express.Router();

//Models
const Category = require('../Models/Category');

//Get All Categories
router.get('/', (req, res) => {
	const promise = Category.find({});
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});
});

//Create New Categories
router.post('/create', (req, res) => {
	const category = new Category(req.body);
	const promise = category.save();
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Update Category by ID
router.put('/:category_id', (req, res) => {
	const promise = Category.findByIdAndUpdate(req.params.category_id, req.body, { new: true });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

//Delete Category by Id
router.delete('/:category_id', (req, res) => {
	const promise = Category.findByIdAndRemove(req.params.category_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
