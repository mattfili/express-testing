//npm requires
var express = require('express');
var lessCSS = require('less-middleware')
var morgan = require('morgan')
var loggly = require('loggly');
var fs = require('fs')
var bodyParser = require('body-parser')


//file requires

var routes = require('./routes/index');
var pizza = require('./routes/pizza');
var loggly = require('./lib/loggly')
var cnode = require('./routes/cnode')

//variables

var app = express();

//settings

// requre('./lib/secrets');
require('./lib/mongodb');

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = "aweso.me";

// middlewares

var logStream = fs.createWriteStream('access.log', {flags: 'a'});
app.use(lessCSS('public'));
app.use(morgan('dev', {stream: logStream}))
 
// app.use(function (req, res, next) {
// 	var client = loggly('incoming');

// 	client.log({
// 		ip: req.ip, 
// 		date: new Date(), 
// 		url: req.url,
// 		status: req.statusCode,
// 		method: req.method	
// 	});
// 	next();
// })

app.use(function (req, res, next) {
	console.log('request at ' + new Date().toISOString());
	next();
});

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}))

// routes

// require('./routes/index')(app); could do it this way by passing it 
app.use('/', routes)
app.use('/pizza', pizza)
app.use('/cnode', cnode)

// e.g.,
// app.use('/users', use)
// app.use('/todo', todo)

// error handling

app.use(function (err, req, res, next) {
	console.log('error', err.stack);
	res.status(500).send('My Bad');
});

app.use(function (req, res) {
	res.status(403).send('unauthorized bro');
});

app.use(function (req, res, next) {
	var client = loggly('error')
	client.log({
		ip: req.ip, 
		date: new Date(), 
		url: req.url,
		status: req.statusCode,
		method: req.method,
		err: err
	});
	next();
})

var port = process.env.PORT || 3000;

var server = app.listen(port, function () {
	var host = server.address().address;

	console.log('example app listening at http://%s:%s', host, port)
});



