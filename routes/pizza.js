var express = require('express');
var router = express.Router();
var moment = require('moment')
var ObjectId = require('mongodb').ObjectID


router.get('/:topping/:qty', function (req, res) {
	var collection = global.db.collection('pizza')

	collection.find({}).toArray(function(err, order) {
		var pizzaOrder = order.map(function (order) {
			return {
				name:       'pizza',
				topping: 	req.params.topping,
				amount: 	req.params.qty 
			}
		});
		res.render('templates/pizza', {pizza: pizzaOrder})
	});
});

router.post('/:topping/:qty', function (req, res) {
	var collection = global.db.collection('pizza')
	console.log(req.params.topping)
	console.log(req.params.qty)

		collection.save({
			name: 'pizza',
			topping: req.params.topping,
			amount: req.params.qty
		});

});

module.exports = router;