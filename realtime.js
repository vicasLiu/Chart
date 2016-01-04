var socketio = require('socket.io');
var request = require("request");
var crypto = require('crypto');
var async = require('async');
var util = require("./util");

var realtime = {
    init : function( http ) {
        var io = socketio(http);
        encryption();
        io.on('connection', function(socket){
            timeInte = setInterval(function(){
                
            }, clusterInfo.timegap);
            socket.on("disconnect", function(){
                
                clearInterval(timeInte);
            });
        });
    }
};
module.exports = realtime;