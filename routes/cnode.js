var express = require('express');
var router = express.Router();
var moment = require('moment')
var ObjectId = require('mongodb').ObjectID


function getIncomplete(req, res, next) { 
	var collection = global.db.collection('cNode')

	collection.find({ complete: { $exists: false} }).toArray(function(err, order) {
		var incompleteOrders = order.map(function (order) {
			return {
				_idkey: 	order._id,
				name: 		order.name,
				style: 		order.style,
				qty: 		order.qty,
				createdAt: 	moment(order._id.getTimestamp()).fromNow()
			}
		});
		req.incomplete = incompleteOrders;
		return next();
	});
};

function getComplete(req, res, next) { 
	var collection = global.db.collection('cNode')
	collection.find({ complete: { $exists: true} }).toArray(function(err, complete) {
		var completeOrders = complete.map(function (order) {
			return {
				_idkey: 	order._id,
				name: 		order.name,
				style: 		order.style,
				qty: 		order.qty,
				createdAt: 	moment(order._id.getTimestamp()).fromNow()
			}
		});
		req.complete = completeOrders;
		return next();
	});
};

function rendercNode (req, res) {
	res.render('templates/cnode-index', {
		orders : req.incomplete,
		comOrders: req.complete
	});
};

router.get('/', getIncomplete, getComplete, rendercNode)



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
	console.log(req.params.id)

	collection.update(
		{_id: ObjectId(req.params.id)}, 
		{$set: {complete: true}}, 
		function () {
			res.redirect('/cnode')
	});
});

module.exports = router;