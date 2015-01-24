/** import models */
var Article		= require('../../models/Article.js');

/** export actions from this controller */

/** list all articles */
exports.listAction = function(req, res) {	
	Article.find({/* no criteria */}, function(err, articles) {
		res.json(articles);
	});	
}

/** create */
exports.postAction = function(req, res) {
	var params = req.body;
	var article = new Article({
		title: 	params.title,
		body: 	params.body,
		excerpt: params.excerpt,
		date: new Date(),  
	});
	article.save(function(err, entry) {
		if(err) {
			res.json({error: err.toString()});
		} else {
			res.json({success: entry._id});
		}
	});
}

/** read */
exports.getAction = function(req, res) {
	Article.findOne({ '_id' : req.params.id }, function(err, article) {
		if(err) {
			res.json({error: err.toString()});
		} else {
			res.json(article);
		}
	});
}

/** update */
exports.putAction = function(req, res) {
	var params = req.body;
	Article.findOneAndUpdate(
		{ '_id' : params.id },
		{
			title: 	params.title,
			body: 	params.body,
			excerpt: params.excerpt
		},
		{upsert: true},
		function(err, article) {
		if(err) {
			res.json({error: err.toString()});
		} else {
			res.json(article);
		}
	});
}

/** delete */
exports.deleteAction = function(req, res) {
	Article.findOneAndRemove({ '_id' : req.params.id }, function(err, article) {
		if(err) {
			res.json({error: err.toString()});
		} else {
			res.json({success: true});
		}
	});
}