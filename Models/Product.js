
const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	productName: {
		type: String,
		required: true,
		unique: true,
	},
	category_id: mongoose.Types.ObjectId,
	unitStock: {
		type: Number,
		required: true,
	},
	unitPrice: Number,
	discontinued: false,
});
module.exports = mongoose.model('product', ProductSchema);
