var express = require('express');
var app = express();

app.set('view engine', 'ejs');

app.get('/test', function (req, res) {
	res.send('Test1!');
	next();
});

app.get('/awesomethings', function (req, res) {
	var awesomeThings = [
		'Pizza',
		'Bacon',
		'2nd Amendment',
		'Pluto',
		'Space Jam'
	];

	res.render('templates/world', {
		title: 'Awesometitle', 
		welcome: 'thanks for coming!',
		awesomeThings: awesomeThings
	});
});

app.get('/json', function (req, res) {
	res.send({an: 'object'});
});

app.get('thisshoulderror', function (req, res) {
	res.send(badVariable);
});

app.use(function (req, res, next) {
	console.log('request at ' + new Date().toISOString());
	next();
});

app.use(function (err, req, res, next) {
	console.log('error', err.stack);
	res.status(500).send('My Bad');
});

app.use(function (req, res) {
	res.status(403).send('unauthorized bro');
});

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('example app listening at http://%s:%s', host, port)
});



