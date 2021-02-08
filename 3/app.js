/**
 * router를 하나로 통합
 * 템플릿 사용(뷰를 pages 와 templates로 분류)
 */

import express from 'express';
import rootRouter from './routes/index.js';
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
app.set('views', 'views/pages');
//<--

//--> router
app.use('/', rootRouter);
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