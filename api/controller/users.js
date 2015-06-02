/*user.js*/
/*controllers*/

/*
* @autor Jesús Hernández 
*
*/
var feed = require("feed-read");

var userController = function (app, router) {

	router.route('/feed')
		//======================================================
		// 
		//======================================================

		.get(function (req, res) {

			feed("http://feeds.bbci.co.uk/news/technology/rss.xml#", function(err, articles) {
			 	 if (err) {
				  	console.log(err)
				  	return res.status(201).send({
						success:false,
						message: err
					})
				}
			  // Each article has the following properties:
			  // 
			  //   * "title"     - The article title (String).
			  //   * "author"    - The author's name (String).
			  //   * "link"      - The original article link (String).
			  //   * "content"   - The HTML content of the article (String).
			  //   * "published" - The date that the article was published (Date).
			  //   * "feed"      - {name, source, link}
			  // 
				res.status(201).send({
					success:true,
					message: articles
				})
			
			});
						
		})	
}	

module.exports = userController