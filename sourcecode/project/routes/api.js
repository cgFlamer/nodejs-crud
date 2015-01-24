/** definire importuri din librarii */
var express 	= require('express');
var mongo 		= require("mongoose");
var bodyParser 	= require('body-parser');

/** import models */
var Article		= require('../models/Article.js');

/** import controllers */
var ArticleController = require('./controllers/articles');

/** init router */
var router = express.Router();
router.use(bodyParser.json());
router.use(
	bodyParser.urlencoded({
	  extended: true
	})
);

/** define api actions */
router.get("/articles", ArticleController.listAction);
router.get("/articles/:id", ArticleController.getAction);
router.post("/articles", ArticleController.postAction);
router.put("/articles", ArticleController.putAction);
router.delete("/articles/:id", ArticleController.deleteAction);

/** if nothing matched... return 404 */
router.use(function (req, res, next) {
	res.status(404).json({
		url: req.originalUrl,
		error: 'Not found'
	});
});

/** export router */
module.exports = router;