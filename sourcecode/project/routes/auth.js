var auth = require('basic-auth');
var fs 			= require("fs"),
	yaml		= require("js-yaml");
var accounts 	= yaml.load(fs.readFileSync(__dirname + "/../config/config.yaml")).accounts;
module.exports = function(req, res, next) {
  var user = auth(req);
  if (!user || !accounts[user.name] || accounts[user.name].password !== user.pass) {
    res.set('WWW-Authenticate', 'Basic realm="pnxjs"');
    return res.status(401).send();
  }
  return next();
};