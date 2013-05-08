var _ = require('lodash');

module.exports = {

    name: 'JBehave Failed Test Parser',

    description: 'Parse the console text for jbehave failures and return them as an array',

    parse: function (console) {
        var failures = [],
            splitString = '';
        if (console.indexOf('[ERROR] BUILD FAILURE') > 0) {
            splitString = console.substring(console.indexOf('[exec] Results :'));
            var failedMatches = splitString.match(/run\(([a-z0-9\.]+)*\)/gi);
            failures = _.map(failedMatches, function (match) {
                var test = match.match(/run\(([a-z0-9\.]+)\)/i)[1];
                return {
                    name: test.substring(test.lastIndexOf('.') + 1),
                    package: test
                }
            });
        }

        return {
            failedJBehaves: failures
//            failedJBehaves: failedJBehaves = [{
//                name: 'SomeTest',
//                package: 'this.that.SomeTest'
//            }, {
//                name: 'AnotherTest',
//                package: 'that.this.AnotherTest'
//            }, {
//                name: 'YetAnotherTest',
//                package: 'bob.this.that.YetAnotherTest'
//            }]
        };
    }
};