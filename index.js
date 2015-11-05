'use strict';

var app = require('./src/server.js');

var port = 8080;

app.listen(port, function() {
	console.log('listening on port: ', port);
});