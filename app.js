var osc = require('node-osc'),
    app = require('http').createServer(handler),
    io  = require('socket.io').listen(app),
    fs  = require('fs');

io.set('log level', 1);

//start listening
app.listen(3000);

//OSC
//var oscAddr = '192.168.152.49';
var oscAddr = '127.0.0.1';
var oscServer = new osc.Server(10001, oscAddr);
var oscClient = new osc.Client(oscAddr, 10000);

//http
function handler(req, res) {
  fs.readFile(__dirname + '/public/index.html', function(err, data) {
    if (err) {
      res.writeHead(500);
      return res.end('Error');
    }
    res.writeHead(200);
    res.write(data);
    res.end();
  })
}

//socket
io.sockets.on('connection', function(socket) {
  //mode
  socket.on('config', function(data) {
    oscClient.send('/config', data);
    console.log(data);
  })
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
