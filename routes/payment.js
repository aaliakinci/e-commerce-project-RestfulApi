const express = require('express');
const router = express.Router();

//Models
const Payment = require('../Models/Payment');

router.get('/', (req, res) => {
	const promise = Payment.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.post('/create', (req, res) => {
	const payment = new Payment(req.body);
	const promise = payment.save();
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

router.get('/:payment_id', (req, res) => {
	const promise = Payment.findById(req.params.payment_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});

module.exports = router;
