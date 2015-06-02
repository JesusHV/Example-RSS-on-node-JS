function isLogged (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		return res.status(401).send({
			success: false,
			message: "Client error. Bad Request."
		});
	}
}

module.exports = isLogged;