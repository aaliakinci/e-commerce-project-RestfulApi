const createError = require('http-errors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const path = require('path');
//routers
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productRouter = require('./routes/products');
const categoryRouter = require('./routes/category');
const paymentRouter = require('./routes/payment');
const orderRouter = require('./routes/order');
const orderDetailRouter= require('./routes/orderDetail');
const commentRouter= require('./routes/comments');
const errorMiddleware=require('./middleware/errorCatchMiddleware')
const app = express();
require('dotenv').config()
//db connection
require('./db/db');




app.use(express.static(path.join(__dirname, '/public')));
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/products', productRouter);
app.use('/categories', categoryRouter);
app.use('/orders',orderRouter);
app.use('/orderDetail', orderDetailRouter);
app.use('/payments', paymentRouter);
app.use('/comments', commentRouter);
app.use(errorMiddleware);

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
	res.json({error:err});
});

module.exports = app;
