var _ = require('lodash');

var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var users = [];

app.get('/getPlayers/', (req, res) => {
  res.send(JSON.stringify(users));
});

app.get('/user/', (req, res) => {
  res.send(JSON.stringify(_.find(users, (user) => user.id === req.query.userId)));
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on('playerJoin', (player) => {
    users.push(player);
    socket.broadcast.emit('listUpdate', users);
    console.log(player);
  });

  socket.on('lifeUpdate', (payload) => {
    var user = _.find(users, (user) => user.id === payload.userId);
    user.life = payload.life;

    socket.broadcast.emit('listUpdate', users);
  })
});

http.listen(5000, () => {
  console.log('listening on port 5000');
});