const express = require('express');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
	productName: {
		type: String,
		required: true,
		unique: true,
	},
	category_id: {
		type: mongoose.Types.ObjectId,
		required: true,
	},
	unitStock: {
		type: Number,
		required: true,
	},
	unitPrice: Number,
	discontinued: false,
	purchaseQuantity: Number,
	createAt: {
		type: Date,
		default: Date.now,
	},
	canceledQuantity :{
		type:Number,
		default:0
	},
	comments:[
		{
			type:mongoose.Types.ObjectId,
			ref:'Comment'
		}
	],
	productImage:{
		type:String,
	}
});
module.exports = mongoose.model('product', ProductSchema);
