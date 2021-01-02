const express = require('express');
const router = express.Router();

//Middleware
const authenticationMiddleware = require('../middleware/authenticationMiddleware');
 

//Models
const OrderDetail = require('../Models/OrderDetail');

//Get orderDetail by orderDetail_id
router.get('/:orderDetail_id',authenticationMiddleware,(req,res,next)=>{
	const promise =OrderDetail.findById(req.params.orderDetail_id);
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		next(err);
	});
});

router.put('/orderDetail_id',authenticationMiddleware,(req,res,next)=>{
	const promise =OrderDetail.findByIdAndUpdate(req.params.orderDetail_id,req.body,{new:true})
	promise.then((data)=>{
		res.json(data);
	}).catch((err)=>{
		next(err);
	});
})



module.exports=router;