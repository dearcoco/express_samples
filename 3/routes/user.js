import express from 'express';
import {getUserContents, getUserTable} from '../services/userService.js';

var router = express.Router();

router.get('/', (req, res) => {
	const contents = getUserContents();
	res.render('user/index', contents);
});


router.get('/table', (req, res) => {
	const table = getUserTable();
	res.render('user/table', {table:table});
});


export default router;