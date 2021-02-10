/**
 * jwt example
 * https://blog.naver.com/pjt3591oo/221702619939
 * 
 * postman 테스트 순서: 회원가입->로그인->api사용
 */

const express = require('express')
const bodyParser = require('body-parser')
const jwt = require('jsonwebtoken')
const app = express();

const SECRET_KEY = "secret key"

let registryUsers = {};

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('JWT_SECRET', SECRET_KEY)

app.use(bodyParser.urlencoded({ extended: false }));

const loginCheck = (req, res, next) => {
	let { token } = req.headers;
	let { JWT_SECRET } = app.settings;

	if (!token) {
		return res.status(401).json({
			msg: '인증실패'
		});
	}

	jwt.verify(token, JWT_SECRET, (err, decoded) => {
		if (!decoded) {
			return res.status(401).json({
				msg: '인증실패'
			});
		}
		req.user = { name: decoded.name	};
		next();
	})
}


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

	let { JWT_SECRET } = app.settings
	let payload = {
		name: registryUsers[id].name
	}
	let options = {
		expiresIn: '1m', // 1분
		issuer: 'sdsoft',
	  } // registered 정보

	// JWT 토큰생성
	jwt.sign(payload, JWT_SECRET, options, (err, token) => {
		return res.status(201).json({
			token,
			msg: 'success'
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
 * 테스트: header - {"token" : "jwt key..."}
 */
app.get('/api', loginCheck, (req, res, next) => { 
	return res.status(200).json({
		msg: 'api 성공',
		name: req.user.name
	});
});

app.listen(3000, () => { console.log('start 300 port') });