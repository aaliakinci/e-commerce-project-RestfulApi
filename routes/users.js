const express = require('express');
const router = express.Router();

//password hash
const bcrypt = require('bcryptjs');

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

//Register
router.post('/register', (req, res) => {
	const { name, surname, phoneNumber, emailAdress, password } = req.body;
	bcrypt.hash(password, 10, (err,hash) => {
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
