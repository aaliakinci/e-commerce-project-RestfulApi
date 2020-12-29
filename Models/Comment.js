const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const CommenctSchema = new Schema({
user_id:{
	type:mongoose.Types.ObjectId,
	ref:'User',
	required:true
},
product_id:{
	type:mongoose.Types.ObjectId,
	ref:'Product',
	required:true,
},
title:{
	type:String,
	required:true,
	maxlength:[20,'{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
	minlength:[5,'{PATH} alanı en ez {MINLENGTH} karakter olabilir']
},
body:{
	type:String,
	required:true,
	maxlength:[50,'{PATH} alanı en fazla {MAXLENGTH} karakter olabilir'],
	minlength:[5,'{PATH} alanı en ez {MINLENGTH} karakter olabilir']
}
});


module.exports=mongoose.model('comment',CommenctSchema)