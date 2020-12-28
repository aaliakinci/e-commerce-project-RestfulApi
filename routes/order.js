const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const Order = require('../Models/Order');
const OrderDetail = require('../Models/OrderDetail');
const User = mongoose.model('user');

//Get All Order
router.get('/', (req, res) => {
	const promise = Order.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Get order by user_id
router.get('/:user_id', (req, res) => {
	const promise = Order.findById({ user_id: req.params.user_id });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Get Order by order_id
router.get('/:order_id', (req, res) => {
	const promise = Order.findById(req.params.order_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Update Order by order_id
router.get('/:order_id', (req, res) => {
	const promise = Order.findByIdAndUpdate(req.params.order_id, req.body, { new: true });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(data);
		});
});
//Delete Order by order_id
router.get('/:order_id', (req, res) => {
	const promise = Order.findByIdAndRemove(req.params.order_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			res.json(data);
		});
});

//Create order with order detail
router.post('/create', async (req, res) => {
	try {
		const { user_id, quantityProduct, products, totalPrice } = req.body;
		const {
			customerName,
			customerSurname,
			customerPhone,
			customerEmail,
			shippingAdress,
		} = req.body;
		const order = new Order({
			user_id,
			quantityProduct,
			products,
			totalPrice,
		});
		const { _id } = await order.save();
		debugger;
		const lastData = createOrderDetail(
			customerName,
			customerSurname,
			customerPhone,
			customerEmail,
			shippingAdress,
			_id.toString(),
		);
		if (user_id != null) {
			pushUserOrder(user_id, _id);
		}
		res.json(lastData);
	} catch (error) {
		throw error;
	}
});

//Function Area
function createOrderDetail(
	customerName,
	customerSurname,
	customerPhone,
	customerEmail,
	shippingAdress,
	order_id,
) {
	const orderDetail = new OrderDetail({
		customerName,
		customerSurname,
		customerPhone,
		customerEmail,
		shippingAdress,
		order_id,
	});
	const promise = orderDetail.save();
	promise
		.then((data) => {
			const lastData = updateOrderByOrderDetailId(data._id, order_id);
			return lastData;
		})
		.catch((err) => {
			throw err;
		});
}
function updateOrderByOrderDetailId(orderDetail_id, order_id) {
	const promise = Order.findByIdAndUpdate(
		order_id,
		{ orderDetail_id: orderDetail_id },
		{ new: true },
	);
	promise
		.then((data) => {
			return data;
		})
		.catch((err) => {
			throw err;
		});
}

function pushUserOrder(user_id, order_id) {
	const promise = User.findById(user_id);
	promise
		.then((data) => {
			data.orders.push(order_id.toString());
			data.save();
		})
		.catch((err) => {
			throw err;
		});
}

module.exports = router;
