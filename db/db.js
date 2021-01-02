const mongoose = require('mongoose');
 require('dotenv').config()

mongoose.connect(process.env.DB_CONNECT, {
	useNewUrlParser: true,
	useUnifiedTopology: true,	
});
mongoose.connection.on('open', () => {
	console.log('MongoDB Connected');
});
mongoose.connection.on('error', (err) => {
	console.log('MongoDB Not Connected' + err);
});
 
mongoose.Promise = global.Promise;

module.exports = mongoose;