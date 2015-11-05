'use strict';

var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var compression = require('compression');
var healthcheck = require('healthcheck-middleware');

var app = express()
	.use(compression())
	.use(bodyParser.json())
	.use(express.static(path.join(__dirname, 'public')))
	.use('/', require('./routes/lobby.js'))
	.use('/healthcheck', healthcheck());

module.exports = app;
