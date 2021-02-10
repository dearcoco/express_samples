import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('index', { contents: 'Home' });
});

router.get('/about', function(req, res, next) {
	res.render('info/about', { contents: 'about' });
});

export default router;