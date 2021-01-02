const adminAuthentication = async (req,res,next)=>{
	try {
		const user = req.user;
		if(user.isAdmin==false)
		{
			return res.status(403).json({
				mesaj:'Erişim engellendi'
			});
		}
			next();
		
	} catch (error) {
		next(error);
	}

}
module.exports=adminAuthentication;