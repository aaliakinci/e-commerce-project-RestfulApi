const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
//Models
const Comment = require('../Models/Comment');
const User = mongoose.model('user');
const Product = require('../Models/Product');

router.get('/', (req, res) => {});

//Create Comment and push Product and User Comments
router.post('/create', async (req, res) => {
	try {
		const { user_id, product_id, title, body } = req.body;
		const comment = new Comment({ user_id, product_id, title, body });
		const { _id } = await comment.save();
		addCommentToUser(_id.toString(), user_id);
		addCommentToProduct(_id.toString(), product_id);
		res.json({status:1});
	} catch (error) {
		res.json(error);
	}
});
// router.delete('/:comment_id', async (req, res) => {
// 	try {
// 		const { user_id, product_id } = await Comment.findById(req.params.comment_id);
// 		await Comment.findByIdAndRemove(req.params.comment_id);
// 		await removeCommentToUser(req.params.comment_id, user_id);
// 		removeCommentToProduct(req.params.comment_id, product_id);
// 		res.json({status:1});
// 	} catch (error) {
// 		res.json(error);
// 	}
// });

//Function Area

//Create Functions ------------------
function addCommentToUser(comment_id, user_id) {
	const promise = User.findOne({ _id: user_id });
	promise
		.then((data) => {
			data.comments.push(comment_id);
			data.save();
		})
		.catch((err) => {
			throw err;
		});
}
function addCommentToProduct(comment_id, product_id) {
	const promise = Product.findById(product_id);
	promise
		.then((data) => {
			debugger;
			data.comments.push(comment_id);
			data.save();
		})
		.catch((err) => {
			throw err;
		});
}
//Create Functions End ----------------

//Remove Functions
// async function removeCommentToUser(comment_id, user_id) 
// {
// 	debugger;
	
// 	const{comments}	=await User.findById(user_id);
// 	deneme.push(comments.split(comment_id,1));
// 	console.log(deneme);
	
// }
// function removeCommentToProduct(comment_id, user_id) 
// {

// }
// module.exports = router;
