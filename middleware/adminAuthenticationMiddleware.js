const User = require("../models/User");

const adminAuthentication = async (req,res,next)=>{
	try {
		const user = req.user;
		if(user.isAdmin=false)
		{
			throw res.status(403).json({
				message:'Erişim engellendi'
			});
		}
			next();
		
	} catch (error) {
		next(error);
	}

}
module.exports=adminAuthentication;