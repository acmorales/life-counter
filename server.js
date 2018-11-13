var _ = require('lodash');
var express = require('express');
var app = express();
var http = require('http').Server(app);
var path = require('path');
var io = require('socket.io')(http);

const PORT = process.env.PORT || 5000;
var users = [];

app.use(express.static(path.join(__dirname + '/client/build')));

app.get('/getPlayers/', (req, res) => {
  res.send(JSON.stringify(users));
});

app.get('/user/', (req, res) => {
  res.send(JSON.stringify(_.find(users, (user) => user.id === req.query.userId)));
});

app.get('*', (req,res) => {
  res.sendFile(path.join(__dirname + '/client/build/index.html'));
});

io.on('connection', (socket) => {
  console.log(`a user connected: ${socket.id}`);

  socket.on('playerJoin', (player) => {
    users.push(player);
    io.emit('listUpdate', users);
  });

  socket.on('increment', (payload) => {
    var user = _.find(users, (user) => user.id === payload.userId);
    user.life++;
    io.emit('listUpdate', users);
  });

  socket.on('decrement', (payload) => {
    var user = _.find(users, (user) => user.id === payload.userId);
    user.life--;
    io.emit('listUpdate', users);
  });

  socket.on('incrementFive', (payload) => {
    var user = _.find(users, (user) => user.id === payload.userId);
    user.life += 5;
    io.emit('listUpdate', users);
  });

  socket.on('decrementFive', (payload) => {
    var user = _.find(users, (user) => user.id === payload.userId);
    user.life -= 5;
    io.emit('listUpdate', users);
  });
});

http.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});