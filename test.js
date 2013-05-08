
/**
 * Module dependencies.
 */

var Jenkins = require('./lib/jenkins-api/Jenkins'),
    JBehaveParser = require('./lib/jenkins-api/parsers/jbehave');

var jenkins = new Jenkins({
    logWithBuild: true,
    hudsonUrl: 'http://192.168.0.101:8080',
    logParsers: [JBehaveParser]
});

jenkins.jobs(function (error, jobs) {
    console.log('=== JOBS ===');
    console.log(jobs);
    jenkins.job('list-api', function (error, job) {
        console.log('=== JOB ===');
        console.log(job);
        jenkins.build('list-api', 54, function (error, build) {
            console.log('=== BUILD ===');
            console.log(build);
        });
    });
});

