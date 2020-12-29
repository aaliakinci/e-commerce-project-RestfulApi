const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	totalProduct: Number,
	products: [
		{
			type: mongoose.Types.ObjectId,
			ref: 'Product',		
		}
	],
	delivered: {
		type: Boolean,
		default: false,
	},
	deliveredDate:{
		type:Date
	},
	inCargoDate:{
		type:Date
	},
	inCargo:{
		type:Boolean,
		default:false,
	},
	orderDetail_id:{type:mongoose.Types.ObjectId,ref:'OrderDetail'},
	canselOrder:{
		type:Boolean,
		default:false
	},
	createAt:{
		type:Date,
		default:Date.now},
	totalPrice: { type: Number },
});

module.exports = mongoose.model('order', OrderSchema);
