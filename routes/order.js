const express = require('express');
const { NotExtended } = require('http-errors');
const mongoose = require('mongoose');
const router = express.Router();

//Models
const Order = require('../Models/Order');
const OrderDetail = require('../Models/OrderDetail');
const User = mongoose.model('user');
const Product = require('../Models/Product');
//Get All Order
router.get('/', (req, res,next) => {
	const promise = Order.find({});
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Get order by user_id
router.get('/:user_id', (req, res,next) => {
	const promise = Order.findById({ user_id: req.params.user_id });
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Get Order by order_id
router.get('/:order_id', (req, res,next) => {
	const promise = Order.findById(req.params.order_id);
	promise
		.then((data) => {
			res.json(data);
		})
		.catch((err) => {
			next(err);
		});
});
//Update Order by order_id
router.put('/:order_id', async (req, res,next) => {
	try {
		const { canselOrder } = req.body;
	if (canselOrder == 'true') {
		await productUpdatepurchaseQuantity(req.params.order_id, false);
		await productUpdateunitStock(req.params.order_id, false);
	} else {
		const {data:order}=await Order.findByIdAndUpdate(req.params.order_id, req.body, { new: true });
		res.json(order);
	}
	} catch (error) {
		next(error);
	}
});
//Create order with order detail and if has user push user
router.post('/create', async (req, res,next) => {
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
		createOrderDetail(
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
		productUpdatepurchaseQuantity(_id.toString(), true);
		productUpdateunitStock(_id.toString(), true);
		res.json(order);
	} catch (error) {
		next(error);
	}
});

//Function Area

// for update if canseled -------------------

// for update if canseled end -----------------

// for Create Method ----------------------------------------------------!

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

async function productUpdatepurchaseQuantity(order_id, which) {
	if (which) {
		const { products } = await Order.findById(order_id);
		const prdQuantity = [];
		for (i in products) {
			const addedItem = prdQuantity.find((x) => x._id == products[i].toString());
			if (addedItem) {
				addedItem.quantity += 1;
			} else {
				prdQuantity.push({ _id: products[i].toString(), quantity: 1 });
			}
		}
		for (let j = 0; j < prdQuantity.length; j++) {
			const promise = Product.findById(prdQuantity[j]._id.toString());
			promise
				.then((data) => {
					return Product.findByIdAndUpdate(data._id.toString(), {
						purchaseQuantity: data.purchaseQuantity + 1 * prdQuantity[j].quantity,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
		
	} else {
		const { products } = await Order.findById(order_id);
		const prdQuantity = [];
		for (i in products) {
			const addedItem = prdQuantity.find((x) => x._id == products[i].toString());
			if (addedItem) {
				addedItem.quantity += 1;
			} else {
				prdQuantity.push({ _id: products[i].toString(), quantity: 1 });
			}
		}
		for (let j = 0; j < prdQuantity.length; j++) {
			const promise = Product.findById(prdQuantity[j]._id.toString());
			promise
				.then((data) => {
					return Product.findByIdAndUpdate(data._id.toString(), {
						purchaseQuantity: data.purchaseQuantity - 1 * prdQuantity[j].quantity,
						canceledQuantity: data.canceledQuantity + 1 * prdQuantity[j].quantity
					});
				})
				.catch((err) => {
					console.log(err);
				});
	}
}
}

async function productUpdateunitStock(order_id, which) {
	if(which) 
	{
		const { products } = await Order.findById(order_id);
		const prdQuantity = [];
		for (i in products) {
			const addedItem = prdQuantity.find((x) => x._id == products[i].toString());
			if (addedItem) {
				addedItem.quantity += 1;
			} else {
				prdQuantity.push({ _id: products[i].toString(), quantity: 1 });
			}
		}
		for (let j = 0; j < prdQuantity.length; j++) {
			const promise = Product.findById(prdQuantity[j]._id.toString());
			promise
				.then((data) => {
					return Product.findByIdAndUpdate(data._id.toString(), {
						unitStock: data.unitStock - 1 * prdQuantity[j].quantity,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
	else
	{
		const { products } = await Order.findById(order_id);
		const prdQuantity = [];
		for (i in products) {
			const addedItem = prdQuantity.find((x) => x._id == products[i].toString());
			if (addedItem) {
				addedItem.quantity += 1;
			} else {
				prdQuantity.push({ _id: products[i].toString(), quantity: 1 });
			}
		}
		for (let j = 0; j < prdQuantity.length; j++) {
			const promise = Product.findById(prdQuantity[j]._id.toString());
			promise
				.then((data) => {
					return Product.findByIdAndUpdate(data._id.toString(), {
						unitStock: data.unitStock + 1 * prdQuantity[j].quantity,
					});
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}
}
// for Create Method END ----------------------------------------------------!

module.exports = router ;
