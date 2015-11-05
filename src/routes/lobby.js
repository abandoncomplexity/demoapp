'use strict';

var router = require('express').Router();

router.get('/',
	function(req, res) {
		res.send('<html><body>stuff</body></html>');
	}
);
// router.route('/')
// 	.get(function(req, res, next) {
// 		res.
// 	});

module.exports = router;
