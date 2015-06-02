// config.js
module.exports = {
	port: 4000,
	db: {
		database: 'mongodb://jesus.h.v:pp13034773@ds045057.mongolab.com:45057/ametro_db'
	},
	// == Session config ==
	sessionOpts : {
		secret: '1loV3y0UrM0M.DB.JHV.@sensimila',
		store : null,
		saveUninitialized: true,
		resave: false,
		secure: true
	}
}