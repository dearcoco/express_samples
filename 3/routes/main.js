import express from 'express';

var router = express.Router();

router.get('/', function(req, res, next) {
  res.render('main/index', { contents: 'Home' });
});

router.get('/about', function(req, res, next) {
	res.render('main/about', { contents: 'about' });
});

export default router;