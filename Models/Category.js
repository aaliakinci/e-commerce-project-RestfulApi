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
	products: [
		{
			type: mongoose.Types.ObjectId,
			ref:'Product'
		}
	],
	categoryImage:String
});

module.exports = mongoose.model('category', CategorySchema);
