import express from 'express';
import {getUserContents} from '../services/userService.js';

var router = express.Router();

router.get('/', (req, res) => {
	const contents = getUserContents();
	res.render('user/index', contents);
});


router.get('/table', (req, res) => {
	res.render('user/table', {contents:'table'});
});


export default router;