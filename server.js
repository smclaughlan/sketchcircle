const express = require('express');
const favicon = require('express-favicon');
const path = require('path');
const port = process.env.PORT || 3000;
const app = express();
const http = require('http').Server(app);

const io = require('socket.io').listen(http);

app.use(favicon(__dirname + '/build/favicon.ico'));
// the __dirname is the current directory from where the script is running
app.use(express.static(__dirname));
app.use(express.static(path.join(__dirname, 'build')));
app.get('/ping', function (req, res) {
  return res.send('pong');
});
// app.get('/*', function (req, res) {
//   res.sendFile(path.join(__dirname, 'build', 'index.html'));
// });
// app.listen(port);
io.on('connection', (client) => {
  console.log('user connected');
  io.emit('new connection', client.id);

  client.on('chat message', (msg) => {
    console.log('message: ' + msg.body);
    //io.emit sends an event to everyone
    //while socket.broadcast.emit() will send to everyone except emitting socket
    io.emit('chat message', msg);
  })

  client.on('disconnect', () => {
    console.log(`${client.id} user disconnected`);
    io.emit('lost connection', client.id);
  });
});

http.listen(port, () => {
  console.log('listening on ', port);
})

// io.listen(port);
// console.log('listening on port ', port);
