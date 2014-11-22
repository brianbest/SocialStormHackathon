/**
 * Created by brianbest on 14-11-21.
 */
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var redis = require("redis");
var client = redis.createClient();

app.get('/', function(req, res){
  res.sendFile(__dirname + '/app/index.html');
});
app.use("/roomFull", express.static(__dirname + '/app/roomFull.html'));
app.use("/chatroom/:id", express.static(__dirname + '/app/chatroom.html'));
app.use("/styles", express.static(__dirname + '/app/styles'));
app.use("/scripts", express.static(__dirname + '/app/scripts'));
app.use("/elements", express.static(__dirname + '/app/elements'));
app.use("/bower_components", express.static(__dirname + '/app/bower_components'));


io.on('connection', function(socket){
  console.log('a user connected');

  //if the room is full then redirect user out
  //var clientr
    var clientr = io.sockets.server.eio.clientsCount;
    console.log('end');
  if (clientr === 3){
    console.log('OVER!!!');
    //io.sockets.socket(socketId).
    //io.emit('redirect', 'stuff');
  }

  //Send client their id
  var clientID = socket.id;
  io.to(clientID).emit("logon", clientID);


  socket.on("chat message", function(info){
    client.get(info.id, function (err, replies){
      var sendBack = {
        'type': replies,
        'msg': info.msg
      };
      io.emit('chat message', sendBack);
    });

  });


  socket.on("iama", function(msg){
    console.log(msg.id);
    console.log(msg.type);
    //Save id and type of to a db to be searched later
    client.set(msg.id,msg.type);
  });

  socket.on('disconnect',function(){
    console.log('user disconnect');
  });
});


http.listen(3000, function(){
  console.log('listening on *:3000');
});
