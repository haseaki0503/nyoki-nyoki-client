var osc = require('node-osc'),
    express = require('express'),
    app = express(),
    server = require('http').Server(app),
    io = require('socket.io')(server);

io.set('log level', 1);

//server
server.listen(3000);
app.use(express.static('public'));

//OSC
//var oscAddr = '192.168.152.49';
var oscAddr = '127.0.0.1';
var oscServer = new osc.Server(10001, oscAddr);
var oscClient = new osc.Client(oscAddr, 10000);

//socket
io.sockets.on('connection', function(socket) {
  //mode
  socket.on('config', function(data) {
    oscClient.send('/config', data);
    console.log('config: ' + data);
  });
  //graph
  socket.on('emit_graph', function(data) {
    oscClient.send('/graph', data);
    console.log(data);
  });
  //calc
  socket.on('emit_calc', function(data) {
    oscClient.send('/calc', data);
    console.log(data);
  });
  //timer
  socket.on('emit_timer', function(data) {
    oscClient.send('/timer', data);
    console.log(data);
  });
  //visualizer
  socket.on('emit_visualizer', function(data) {
    oscClient.send('/visualizer', data);
    console.log(data);
  });
});

oscServer.on('message', function(msg, rinfo) {
  console.log('[Incoming msg] ' + 'address:' + msg[2][0] + ' msg:' + msg[2][1]);
  console.log(rinfo);
});
