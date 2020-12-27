const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const paymentRouter = require('./routes/payment');
const orderRouter = require('./routes/order');

const app = express();

//db connection
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/e-commerce-project', {
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

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders',orderRouter);
app.use('/payments', paymentRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error = req.app.get('env') === 'development' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});

module.exports = app;
