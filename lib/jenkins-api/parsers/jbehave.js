var _ = require('lodash');

module.exports = {

    name: 'JBehave Failed Test Parser',

    description: 'Parse the console text for jbehave failures and return them as an array',

    parse: function (console) {
        var failures = [],
            splitString = '';

        if (console.indexOf('[ERROR] BUILD FAILURE') > 0) {
            var nodeTestList = console.match(/class (.*) is running on VM \[(.*)\]/gi),
                nodeTestMap = {};

            _.each(nodeTestList, function (line) {
                var split = line.match(/class (.*) is running on VM \[(.*)\]/i);
                nodeTestMap[split[1]] = split[2];
            });

            splitString = console.substring(console.indexOf('[exec] Results :'));
            var failedMatches = splitString.match(/run\(([a-z0-9\.]+)*\)/gi);
            failures = _.map(failedMatches, function (match) {
                var test = match.match(/run\(([a-z0-9\.]+)\)/i)[1];

                return {
                    name: test.substring(test.lastIndexOf('.') + 1),
                    package: test,
                    node: nodeTestMap[test]
                }
            });
        }



        return {
            failedJBehaves: failures
        };
    }
};