/*server.js*/

var express = require('express'),
	app = express(),
	bodyParser = require('body-parser'),
	path = require('path'),
	config = require('./config.js'),
	feed = require("feed-read");

var settings = {};
settings.date = new Date();
app.set('port', (process.env.PORT || config.port));

var cors = require('./api/middleware/cors')(app, app.get('port'));

// =========== Router =========================
var router = express.Router();

// Controller users
var userController = require('./api/controller/users');
userController(app, router);
// API´s router
app.use('/feed/', router);
// Controller views


app.use(express.static(__dirname + '/public'));
app.listen(app.get('port'));
console.log(settings.date.toDateString() + ': Server runing on port : ' + app.get('port'));