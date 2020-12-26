const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	buyerName: {
		type: String,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	buyerSurname: {
		type: String,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	buyerPhoneNumber: {
		type: String,
		unique: true,
		maxlength: [11, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [11, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	buyerEmailAdress: {
		type: String,
		unique: true,
		required: true,
	},
	quantityProduct: Number,
	order_id:mongoose.Types.ObjectId,
	products_id: [
		{
			type: mongoose.Types.ObjectId,
			ref: Product,
		},
	],
	totalPrice: { type: Number },
	shippingAdress: String,
});

module.exports = mongoose.model('orderdetail', OrderDetailSchema);
