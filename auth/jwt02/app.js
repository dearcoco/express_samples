/**
 * jwt example
 * https://blog.naver.com/pjt3591oo/221702619939
 * 
 * postman 테스트 순서: 회원가입->로그인->api사용
 */

import express from 'express';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import verifyToken from './verifyToken.js';
import dotenv from 'dotenv';

dotenv.config()

const app = express();
const skey = process.env.JWT_SECRET;

let registryUsers = {};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


/**
 * 로그인
 * 테스트: param - id, password
 */
app.get('/', (req, res, next) => {
	let { id, password } = req.query;

	if (!registryUsers[id]) {
		return res.status(401).json({
			msg: 'login failed'
		})
	}

	if (registryUsers[id].password !== password) {
		return res.status(401).json({
			msg: 'login failed'
		})
	}

	let payload = {
		name: registryUsers[id].name
	}
	let options = {
		expiresIn: '1m', // 1분
		issuer: 'sdsoft',
	  } // registered 정보

	// JWT 토큰생성
	jwt.sign(payload, skey, options, (err, token) => {
		return res.status(201).json({
			token,
			message: '토큰이 발급되었습니다.',
			code: 200
		})
	})
});


/**
 * 회원가입 
 * 테스트: x-www-form-urlencoded:  id, password, name
 */
app.post('/', (req, res, next) => {
	let { id, password, name } = req.body;
	if (registryUsers[id]) {
		return res.status(200).json({ msg: '해당 아이디는 등록되었습니다.' });
	}
	registryUsers[id] = { id, password, name };

	return res.status(201).json({ msg: 'success' });
});


/**
 * api 사용
 * 테스트: header - {"Authorization" : "Bearer jwt"}
 */
app.get('/api', verifyToken, (req, res, next) => { 
	return res.status(200).json({
		msg: 'api 성공',
		name: req.decoded.name
	});
});

app.listen(3000, () => { console.log('start 300 port') });