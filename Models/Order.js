const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
	user_id: mongoose.Types.ObjectId,
	quantityProduct: Number,
	products: [
		{
			type: mongoose.Types.ObjectId,
			ref: Product,
		},
		{
			productQuantity:Number
		}
	],
	shippingOver: {
		type: Boolean,
		default: false,
	},
	orderDetail_id:mongoose.Types.ObjectId
});

module.exports = mongoose.model('order', OrderSchema);
