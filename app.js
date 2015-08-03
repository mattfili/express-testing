//npm requires
var express = require('express');

//file requires

var routes = require('./routes/index');
var pizza = require('./routes/pizza');

//variables

var app = express();

//settings

app.set('view engine', 'ejs');
app.set('case sensitive routing', true);

app.locals.title = "aweso.me";

// middlewares

app.use(function (req, res, next) {
	console.log('request at ' + new Date().toISOString());
	next();
});

app.use(express.static('public'));

// routes

// require('./routes/index')(app); could do it this way by passing it 
app.use('/', routes)
app.use('/pizza', pizza)

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

var server = app.listen(3000, function () {
	var host = server.address().address;
	var port = server.address().port;

	console.log('example app listening at http://%s:%s', host, port)
});



