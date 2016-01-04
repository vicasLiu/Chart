var express = require('express');
var app = require('express')();
var http = require('http').Server(app);
var realtime = require('./realtime');

app.use(express.static('public'));

realtime.init(http);
app.set('port', process.env.PORT || 3000);
var server = http.listen(app.get('port'), function() {
    console.log('start at port:' + server.address().port);
});
process.on('uncaughtException', function(err) {
    console.error(' Caught exception: ' + err.stack);
});