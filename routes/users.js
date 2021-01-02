const express = require('express');
const router = express.Router();
const createError = require('http-errors');




//Middleware
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const adminAuthentication = require('../middleware/adminAuthenticationMiddleware');
//password hash
const bcrypt = require('bcryptjs');
//mongoose
const mongoose = require('mongoose');
//Models
const User = require('../models/User');

//Get Users with Orders
router.get('/',[authenticationMiddleware,adminAuthentication], (req, res) => {
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
router.get('/:user_id/comments',authenticationMiddleware,
(req, res) => {
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
//update user by user_id 
router.put('/update',authenticationMiddleware,async(req,res,next)=>{
	try {
	const user_id = (req.user._id);
	console.log(user_id)
	const updatedUser = await User.findByIdAndUpdate(user_id,req.body,{new:true});
	res.json({updatedUser})
	} catch (error) {
		next(error);
	}
});
//user modify to admin
router.put('/update/admin',[authenticationMiddleware,adminAuthentication],async(req,res,next)=>{
	try {
	const user_id = req.body._id;
	const updatedUser = await User.findByIdAndUpdate(user_id,{isAdmin:true},{new:true});
	res.json({updatedUser})
	} catch (error) {
		next(error);
	}
});

//Login
router.post('/login', async (req, res, next) => {
	try {
		const { emailAdress, password } = req.body;
		const user = await loginUser(emailAdress, password);
		const token = await user.generateToken();

		res.json({user,token});
	} catch (error) {
		next(error);
	}
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

//Function Area
async function loginUser(emailAdress, password) {
	const user = await User.findOne({ emailAdress });
	if (!user) {
		throw createError(400, 'Girilen email/şifre hatalı');
	}
	const checkPassword = bcrypt.compare(password, user.password);
	if (!checkPassword) {
		throw createError(400, 'Girilen email/şifre hatalı');
	}
	return user;
}

module.exports = router;
