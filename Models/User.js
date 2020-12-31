const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: {
		type: String,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	surname: {
		type: String,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	phoneNumber: {
		type: String,
		unique: true,
		maxlength: [11, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [11, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	emailAdress: {
		type: String,
		unique: true,
		required: true,
	},
	adress: String,
	password: {
		type: String,
		required: true,
		minlength: [8, '{PATH} alanı en az {MINLENGTH} olmalıdır ! '],
	},
	orders: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Order',
		},
	],
	createAt: {
		type: Date,
		default: Date.now,
	},
	comments: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Comment',
		},
	],
});

module.exports = mongoose.model('user', UserSchema);
