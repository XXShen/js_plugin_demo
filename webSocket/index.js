var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var userList = [];

app.get('/', function(req, res){
  res.sendfile('index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);//向所有客户端发消息
  });

  socket.on('user name', function(userName){
  	var confirmMsg = {success:false};
    if(userList.indexOf(userName) === -1){
    	confirmMsg.success = true;
    	confirmMsg.userName = userName;
    }
    io.emit('user name confirm', confirmMsg);
    io.emit('new user', userName);
    return ;
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });
});
http.listen(3000, function(){
  console.log('listening on *:3000');
});