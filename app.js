var app = require('express')();
var server = require('http').Server(app);
var io =  require('socket.io')(server);
var path = require('path');

app.get('/', function(req, res){
	res.sendFile(path.join(__dirname+'/index.html'));
});

var usr = [];
io.on('connection', function(socket){
	
	socket.emit('myId', usr.length);
	usr.push(usr.length);
	
	io.emit('createUsuarios', usr);
	

	socket.on('part', function(data){
		socket.emit('part', data);
	});

	socket.on('updateImage', function(data){
		socket.broadcast.emit('updateImage',data);
	});

	socket.on('disconnect', function () {
    	
  	});
});



server.listen(4000);