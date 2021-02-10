import jwt from 'jsonwebtoken';

function verifyToken(req, res, next) {
	if (!req.headers.authorization) {
		return res.status(401).json({
			code: 401,
			message: '유효하지 않은 요청입니다.'
		});
	}

	const key = process.env.JWT_SECRET;
	// 인증 완료
	try {
		const token = req.headers.authorization.split('Bearer ')[1];
		req.decoded = jwt.verify(token, process.env.JWT_SECRET);
		
		return next();
	}
	// 인증 실패
	catch (error) {
		// 유효기간이 초과된 경우
		if (error.name === 'TokenExpiredError') {
			return res.status(419).json({
				code: 419,
				message: '토큰이 만료되었습니다.'
			});
		}

		// 토큰의 비밀키가 일치하지 않는 경우
		return res.status(401).json({
			code: 401,
			message: '유효하지 않은 토큰입니다.'
		});
	}
}

export default verifyToken;