const jwt = require("jsonwebtoken");
const response = require("../utils/response");
const jwtSecret = process.env.JWT_SECRET;

exports.verifyToken = (req, res, next) => {
	const token = req.headers["x-auth-token"];

	if (!token) {
		return response.error({ res, msg: "No token provided", status: 403 });
	}

	jwt.verify(token, jwtSecret, (err, decoded) => {
		if (err) {
			return response.error({
				res,
				msg: "Token session expired",
				status: 401,
			});
		}

		req.decoded = decoded;

		next();
	});
};
