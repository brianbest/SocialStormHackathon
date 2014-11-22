/**
 * Created by brianbest on 14-11-21.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
//var redis = require("redis");
//var client = redis.createClient();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});

app.use("/styles", express.static(__dirname + '/app/styles'));
app.use("/scripts", express.static(__dirname + '/app/scripts'));
app.use("/elements", express.static(__dirname + '/app/elements'));
app.use("/bower_components", express.static(__dirname + '/app/bower_components'));


io.on('connection', function(socket){
  console.log('a user connected');
  io.emit('logon', socket);

  socket.on("chat message", function(msg){
    //Print message to db
    //client.rpush('mes1', msg, redis.print);
    io.emit('chat message', msg);
  });
  socket.on('disconnect',function(){
    console.log('user disconnect');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
