
/**
 * Module dependencies.
 */

var express = require('express'),
    http = require('http'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    path = require('path'),
    socketio = require('socket.io');

var app = express();

app.configure(function(){
    app.set('port', process.env.PORT || 3000);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');
    app.set('view options', { layout: false });
    app.engine('.html', consolidate.swig);
    app.use(express.favicon());
    app.use(express.bodyParser());
    app.use(express.methodOverride());
    app.use(app.router);
    app.use(express.static(path.join(__dirname, 'public')));
    swig.init({ cache: false, root: __dirname + '/views' });
});

app.configure('development', function(){
    app.use(express.errorHandler());
});

app.get('/', function (req, res) {
    res.render('index');
});

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
