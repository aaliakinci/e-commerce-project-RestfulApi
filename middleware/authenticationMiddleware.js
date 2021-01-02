const jwt = require('jsonwebtoken');
require('dotenv').config()
const auth = (req, res, next) => {
	try {
		const token = req.header('Authorization').replace('Bearer ', '');
		const result = jwt.verify(token,process.env.JWT_SECRET_KEY);
		req.user = result;
		next();
	} catch (error) {
		next(error);
	}
};
module.exports = auth;
