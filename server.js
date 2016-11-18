var express = require('express');
var path    = require('path');


var app = new express();

// Setup view engine
app.set('view engine', 'html');

app.use(express.static(path.resolve(path.join(__dirname, '/dist'))));
app.use('/api/session', require('./api.js'));

app.get('/', function (req, res) {
  res.sendfile('../dist/index.html');
});

var server = app.listen(process.env.PORT || 8080, function () {
  console.log('App listening on port %s', server.address().port);
  console.log('Press Ctrl+C to quit.');
});