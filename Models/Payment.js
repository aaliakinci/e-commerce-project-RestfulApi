const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	cardNumber: {
		types: Number,
		minlength: [16, '{PATH} alanı minumum {MINLENGTH} olmalı'],
		minlength: [16, '{PATH} alanı minumum {MINLENGTH} olmalı'],
	},
	cardSecurityCode: {
		type: Number,
		min: [3, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	expirationMounthOfCard: {
		type: Number,
		min: [1, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
		max: [12, '{PATH} alanı en az {MAXLENGTH} karakter olmalı'],
	},
	expirationYearOfCard: {
		type: Number,
		min: [2020, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	cardFullName: {
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
	totalPrice: { type: Number },
	shippingAdress: String,
});

module.exports = mongoose.model('payment', PaymentSchema);
