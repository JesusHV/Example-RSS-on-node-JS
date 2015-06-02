// attack.js

var hexArray = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'k', 'j']
//var hexArray = ['2', '5',  '7', 'a', 'b']

var async = require('async')



var forEach = require('async-foreach').forEach
var request = require('request')


forEach(hexArray, function(item, index, arr) {
	
  
  forEach(hexArray, function(item2, index, arr) {
	  
	  	forEach(hexArray, function(item3, index, arr) {
		  
			   forEach(hexArray, function(item4, index, arr) {
					  
					  forEach(hexArray, function(item5, index, arr) {
						  //console.log("each" + item + item2 + item3 + item4 + item5);
						  var key = item + item2 + item3 + item4 + item5
						  console.log("GAMEEEE: " + item + item2 + item3 + item4 + item5)
						  var options = {
								//method: "POST",
								uri: 'http://localhost:1337/ametro/reporte',
								json: true,
								body: {
									ubicacion: key,
									user: key
								}
							}
							function callback(er, res, bdy){
								console.log("soy funcion de request: " + res.statusCode + " " + key)
								if (res.statusCode == 500) {
									process.exit()
								}
							}
							request.post(options, callback)

						  var done = this.async();
						  setTimeout(function() {
						    done();
						  }, 24);

						});
				
					  var done = this.async();
					  setTimeout(function() {
					    done();
					  }, 576);
					});
			  var done = this.async();
			  setTimeout(function() {
			    done();
			  }, 13824);
			});
	  var done = this.async();
	  setTimeout(function() {
	    done();
	  }, 331776);
	});
  var done = this.async();
  setTimeout(function() {
    done();
  },7962624);

});

