
/**
 * Module dependencies.
 */

var http = require('http'),
    express = require('express'),
    consolidate = require('consolidate'),
    swig = require('swig'),
    path = require('path'),
    socketio = require('socket.io'),
    JenkinsClient = require('./lib/jenkins-api/Jenkins'),
    JBehaveParser = require('./lib/jenkins-api/parsers/jbehave');

var app = express(),
    server = http.createServer(app),
    io = socketio.listen(server, { log: false }),
    jenkins = new JenkinsClient({
        hudsonUrl: 'http://hudson-dsa.cg.bskyb.com',
        logParsers: [JBehaveParser]
    });

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

app.get('/:build', function (req, res) {
    res.render('index');
});

server.listen(app.get('port'), function(){
    console.log('Express server listening on port ' + app.get('port'));
});

io.sockets.on('connection', function (socket) {
    socket.on('builds', function (data) {
        jenkins.getJob(data.job, function (error, job) {
            if (!error && job.lastFailedBuild.number > data.since) {
                getBuildsRecursive(jenkins, data.job, data.since, job.lastFailedBuild.number, function (build) {
                    socket.emit('build', build);
                });
            }
        });
    });
});

function getBuildsRecursive (jenkins, job, from, to, callback) {
    console.log('Fetching build: ', to, ' from: ', from);
    jenkins.getBuild(job, to, function (error, build) {
        if (!error) {
            if (build.result === 'FAILURE') {
                callback(build);
            }
            to = to - 1;
            if (to > from) {
                getBuildsRecursive(jenkins, job, from, to, callback);
            }
        }
    });
}