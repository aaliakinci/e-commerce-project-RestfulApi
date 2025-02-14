const express = require('express');
const router = express.Router();

//Middleware
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
const adminAuthentication = require('../middleware/adminAuthenticationMiddleware');

//Models
const Payment = require('../Models/Payment');
//Get All Payment
router.get('/',[authenticationMiddleware,adminAuthentication], (req, res,next) => {
	const promise = Payment.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Create Payment
router.post('/create', (req, res,next) => {
	const payment = new Payment(req.body);
	const promise = payment.save();
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

//Get payment by payment_id
router.get('/:payment_id',[authenticationMiddleware,adminAuthentication], (req, res,next) => {
	const promise = Payment.findById(req.params.payment_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});

module.exports = router;
