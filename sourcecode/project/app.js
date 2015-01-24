/** imports */
var express   	= require("express");
var mongo     	= require("mongoose");
var fs 			= require("fs"),
	yaml		= require("js-yaml");

/** read config */
var config 		= yaml.load(fs.readFileSync(__dirname + "/config/config.yaml"));
// console.log(config);

/** init app */
var app			= express();
mongo.connect(config.mongo_db, function(err) {
    if(err) {
        console.log('mongo - error ', err);
    }
});

/** use */
app.use(express.static(config.public_dir));

/** CORS middleware */
var allowCrossDomain = function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
}
app.use(allowCrossDomain);

/** resources for the api */
app.use("/api", require("./routes/auth"));
app.use("/api", require('./routes/api'));

/** set listen port */
app.listen(config.port);
console.log("%s running - port %d", config.name, config.port);