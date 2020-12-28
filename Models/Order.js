const mongoose = require('mongoose');
const Schema = mongoose.Schema;



const OrderSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	quantityProduct: Number,
	products: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Product',
		},
		{
			productQuantity:Number
		}
	],
	delivered: {
		type: Boolean,
		default: false,
	},
	inCargo:{
		type:Boolean,
		default:false,
	},
	orderDetail_id:{type:mongoose.Types.ObjectId,ref:'OrderDetail'},
	totalPrice: { type: Number },
});

module.exports = mongoose.model('order', OrderSchema);
