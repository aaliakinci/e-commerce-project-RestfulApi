const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderDetailSchema = new Schema({
	customerName: {
		type: String,
		unique: false,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
		
	},
	customerSurname: {
		type: String,
		unique: false,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
		
	},
	customerPhone: {
		type: String,
		unique: false,
		maxlength: [11, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [11, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
		
	},
	customerEmail: {
		type: String,
		unique: false,
	},
	order_id: {
		type: mongoose.Types.ObjectId,
		ref: 'Order',
	},
	shippingAdress: { type: String, unique: false },
});

module.exports = mongoose.model('orderdetail', OrderDetailSchema);
