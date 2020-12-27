const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PaymentSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	creditCardNumber: {
		type:String,
		required:true,
		// minlength: [16, '{PATH} alanı minumum {MINLENGTH} olmalı'],
		// maxlength: [16, '{PATH} alanı minumum {MAXLENGTH} olmalı'],
	},
	cardSecurityCode: {
		type: Number,
		required:true,
		min: [3, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	expirationMounthOfCard: {
		type: Number,
		required:true,
		min: [1, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
		max: [12, '{PATH} alanı en az {MAXLENGTH} karakter olmalı'],
	},
	expirationYearOfCard: {
		type: Number,
		required:true,
		min: [2020, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	cardFullName: {
		type: String,
		required:true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	totalPrice: { type: Number },
});

module.exports = mongoose.model('payment', PaymentSchema);
