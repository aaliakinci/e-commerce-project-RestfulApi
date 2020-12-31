const express = require('express');
const router = express.Router();

//password hash
const bcrypt = require('bcryptjs');
//mongoose
const mongoose = require('mongoose');
//Models
const User = require('../models/User');

//Get Users with Orders
router.get('/', (req, res) => {
	const promise = User.aggregate([
		{
			$lookup: {
				from: 'Order',
				localField: 'orders',
				foreignField: '_id',
				as: 'Orders',
			},
		},
		{
			$unwind: {
				path: '$Orders',
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
//Get User Lookup Comments
router.get('/:user_id/comments', (req, res) => {
	const promise = User.aggregate([
		{
			$match: { _id: mongoose.Types.ObjectId(req.params.user_id) },
		},
		{
			$lookup: {
				from: 'comments',
				localField: 'comments',
				foreignField: '_id',
				as: 'comments',
			},
		},
		{
			$unwind: {
				path: '$comments',
				preserveNullAndEmptyArrays: true,
			},
		},
		{
			$group: {
				_id: {
					_id: '$_id',
					name: '$name',
					surname: '$surname',
				},
				comments: {
					$push: '$comments',
				},
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

//Register
router.post('/register', (req, res) => {
	const { name, surname, phoneNumber, emailAdress, password } = req.body;
	bcrypt.hash(password, 10, (err, hash) => {
		const user = new User({
			name,
			surname,
			phoneNumber,
			emailAdress,
			password: hash,
		});
		const promise = user.save();
		promise
			.then((data) => {
				res.json(data);
			})
			.catch((err) => {
				res.json(err);
			});
	});
});

//Login
router.post('/login', (req, res) => {});
module.exports = router;
