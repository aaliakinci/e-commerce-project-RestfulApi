const express = require('express');
const router = express.Router();

//Models
const Order = require('../Models/Order');
const OrderDetail = require('../Models/OrderDetail');

router.get('/', (req, res) => {});

router.post('/create', (req, res) => {
	const { user_id, quantityProduct, products, totalPrice } = req.body;
	const { buyerName,buyerSurname, buyerPhoneNumber, buyerEmailAdress, shippingAdress } = req.body;
	const order = new Order({
		user_id,
		quantityProduct,
		products,
		totalPrice,
	});
	const promise = order.save();
	promise
		.then((data) => {
			const orderDetail_id = createOrderDetail(
				buyerName,
				buyerSurname,
				buyerPhoneNumber,
				buyerEmailAdress,
				shippingAdress,
				data._id,
			);
			const updatedOrder = updateOrderByOrderDetailId(orderDetail_id, order_id);
			res.json(updatedOrder);
		})
		.catch((err) => {
			res.json(err);
		});
});
//Function Area
function createOrderDetail(
	buyerName,
	buyerSurname,
	buyerPhoneNumber,
	buyerEmailAdress,
	shippingAdress,
	order_id,
) {
	const orderDetail = new OrderDetail({
		buyerName,
		buyerSurname,
		buyerPhoneNumber,
		buyerEmailAdress,
		shippingAdress,
		order_id,
	});
	const promise = orderDetail.save();
	promise
		.then((data) => {
			return data._id.toString();
		})
		.catch((err) => {
			res.json(err);
		});
}
function updateOrderByOrderDetailId(orderDetail_id, order_id) {
	const promise = Order.findByIdAndUpdate(order_id, orderDetail_id, { new: true });
	promise
		.then((data) => {
			return data;
		})
		.catch((err) => {
			res.json(err);
		});
}

module.exports = router;
