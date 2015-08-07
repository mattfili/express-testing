var express = require('express');
var router = express.Router();

router.get('/', function (req, res) {
	var collection = global.db.collection('cNode')
	collection.find({}).toArray(function(err, order) {
		var formattedOrders = order.map(function (order) {
			return {
				name: 		order.name,
				style: 		order.style,
				qty: 		order.qty,
				createdAt: 	order._id.getTimestamp()
			}
		});
	});
	res.render('templates/cnode-index', {orders: formattedOrders})
});

router.get('/order', function(req, res) {
	res.render('templates/cnode-new');
});

router.post('/order', function (req, res) {
	var collection = global.db.collection('cNode')
	collection.save(req.body, function () {
		res.redirect('/')
	});
});

module.exports = router;