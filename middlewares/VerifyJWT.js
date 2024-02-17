const jwt = require('jsonwebtoken');

const verifyJwt = (req, res, next) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		return res.status(401).send('Unauthorized Access');
	}
	const token = authHeader.split(' ')[1];
	jwt.verify(token, process.env.JWT_Token, function (err, decoded) {
		if (err) {
			return res.status(403).send('forbidden Access');
		}
		req.decoded = decoded;
		next();
	});
};

module.exports = verifyJwt;
