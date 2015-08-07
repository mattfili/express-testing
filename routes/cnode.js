var express = require('express');
var router = express.Router();
var moment = require('moment')


router.get('/', function (req, res) {
	var collection = global.db.collection('cNode')

	collection.find({}).toArray(function(err, order) {
		var formattedOrders = order.map(function (order) {
			return {
				_idkey: 	order._id,
				name: 		order.name,
				style: 		order.style,
				qty: 		order.qty,
				createdAt: 	moment(order._id.getTimestamp()).fromNow()
			}
		});
		res.render('templates/cnode-index', {orders: formattedOrders})
	});
});

router.get('/order', function(req, res) {
	res.render('templates/cnode-new');
});

router.post('/order', function (req, res) {
	var collection = global.db.collection('cNode')

	collection.save(req.body, function () {
		res.redirect('/cnode')
	});
});

router.post('/order/:id/complete', function (req, res) {
	var collection = global.db.collection('cNode')

	collection.update({_id:req.params.id}, function () {
		res.redirect('/cnode')
	});
});

module.exports = router;