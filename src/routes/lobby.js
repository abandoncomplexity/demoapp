'use strict';

var util = require('util');

var router = require('express').Router();

router.get('/',
	function(req, res) {
		res.send('<html><body>stuff</body></html>');
	}
);

router.get('/request',
	function(req, res, next) {
		next();
	},

	function(req, res) {
		var value = res.locals.item;
		res.send(util.format('<html><body>%s</body></html>', value));
	}
);


// router.route('/')
// 	.get(function(req, res, next) {
// 		res.
// 	});

module.exports = router;
