var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

const users = [];

app.get('/getPlayers', function(req, res){
  res.send(JSON.stringify(users));
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('playerJoin', (player) => {
    users.push(player);
    socket.broadcast.emit('listUpdate', users);
  });
});

http.listen(5000, () => {
  console.log('listening on port 5000');
});