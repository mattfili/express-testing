var express = require('express');
var router = express.Router();

router.get('/', function(req, res) {
	res.render('templates/cnode');
});

router.post('/order', function (req, res) {
	console.log(req.body);
	res.redirect('/')
});

module.exports = router;