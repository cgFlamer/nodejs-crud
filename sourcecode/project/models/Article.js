var mongoose = require('mongoose');

var options = {
    autoIndex: false,
    collection: 'articles'
};

var ArticleSchema = new mongoose.Schema({
  title: String,
  body: String,
  date: { type: Date, default: Date.now },
  excerpt: String
},
options);

module.exports = mongoose.model('Article', ArticleSchema);
