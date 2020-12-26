const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CategorySchema = new Schema({
	categoryName: {
		type: String,
		required: true,
		maxlength: [25, '{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
		minlength: [2, '{PATH} alanı en az {MINLENGTH} karakter olmalı'],
	},
	description: String,
	products_id: [
		{
			type: mongoose.Types.ObjectId,
			ref: Product,
		},
	],
});

module.exports = mongoose.model('category', CategorySchema);
