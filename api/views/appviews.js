var path = require('path');

module.exports = function (express) {
	router = express.Router();

	router.route('/')
		.get(isYetLoggedUser, function (req, res){
			res.sendFile(path.join(__dirname + '../../../public/views/index.html'))
		});
	router.route('/app')
		.get(isLoggedUser, function (req, res){
			res.sendFile(path.join(__dirname + '../../../public/views/app.html'))
		});
	router.route('/admin')
		.get(function (req, res){
			res.sendFile(path.join(__dirname + '../../../public/views/admin.html'))
		});
	router.route('/logout')
		.get(function (req, res){
			req.logout();
			res.redirect('/');
		});

	return  router;		
}

function isLoggedUser (req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	} else {
		res.redirect('/');
	}
}

function isYetLoggedUser (req, res, next) {
	if (req.isAuthenticated()) {
		res.redirect('/app');
	} else {
		return next();
	}
}