/** define imports */
var fs 			= require("fs"),
	yaml		= require("js-yaml"),
	soap_server	= require("soap-server")
	mongo     	= require("mongoose");

/** read config */
var config 		= yaml.load(fs.readFileSync(__dirname + "/config/config.yaml"));

/** connect mongo */
mongo.connect(config.mongo_db, function(err) {
    if(err) {
        console.log('mongo - error ', err);
    }
});

/** import models */
var Article		= require('./models/Article.js');

/** define article's SOAP service */
function ArticleService() {}
ArticleService.prototype.delete = function(id) {
	var response = 0;
	Article.findOneAndRemove(
		{ '_id' : id },
		function(err, article) {
			if(!err) {
				response = 1;
			}
		}
	);
	return response;
}

/** create SOAP server */
var soapServer = new soap_server.SoapServer();
var soapService = soapServer.addService('articleService', new ArticleService());

/** set method property */
var deleteOperation = soapService.getOperation('delete');
deleteOperation.setInputType('id', {type: 'string'});
deleteOperation.setOutputType('number');
soapServer.listen(config.soap_port);
console.log("%s SOAP server running - port %d", config.name, config.soap_port);