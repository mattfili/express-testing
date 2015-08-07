var express = require('express');
var router = express.Router();

router.get('/test', function (req, res) {
	res.send('Test1!');
	next();
});

router.get('/awesomethings', function (req, res) {
	var collection = global.db.collection('awesomeThings')

	collection.find().toArray(function(err, things) {
		res.render('templates/world', {
			welcome: 'thanks for coming!',
			awesomeThings: things
		});
	});
});

router.get('/json', function (req, res) {
	res.send({an: 'object'});
});

router.get('thisshoulderror', function (req, res) {
	res.send(badVariable);
});

module.exports = router;

