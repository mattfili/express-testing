var mongo = require('mongodb').MongoClient

if(!global.db) {
	mongo.connect('mongodb://localhost:27017/awesome_things', function (err, db) {
	global.db = db
	})
}