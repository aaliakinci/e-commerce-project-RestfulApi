const express = require('express');
const router = express.Router();

//Models
const OrderDetail = require('../Models/OrderDetail');

//Get orderDetail by orderDetail_id
router.get('/:orderDetail_id',(req,res)=>{
	const promise =OrderDetail.findById(req.params.orderDetail_id);
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		res.json(err);
	});
});



module.exports=router;