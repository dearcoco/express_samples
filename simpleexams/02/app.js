import express from 'express';
import { mainRouter, userRouter } from './routes/index.js';
import createError from 'http-errors';
import logger from 'morgan';
import cookieParser from 'cookie-parser';

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//--> static
app.use(express.static('./public'));
//<--

//--> view
app.set('view engine', 'ejs');
app.set('views', 'views');
//<--

//--> router
app.use('/', mainRouter);
app.use('/user', userRouter);
//<--

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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`server started on port ${PORT}`));