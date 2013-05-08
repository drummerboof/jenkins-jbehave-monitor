var Jenkins = (function () {

    var _ = require('lodash'),
        util = require('util'),
        request = require('request');

    var API = '/api/json',
        JOB = '/job/%s',
        BUILD = '/job/%s/%s',
        CONSOLE = '/job/%s/%s/consoleText',
        LAST_FAILED = '/job/%s/lastFailedBuild',
        LAST_SUCCESSFUL = '/job/%s/lastSuccessfulBuild';

    var Jenkins = function (options) {
        this._options = _.extend({
            hudsonUrl: '',
            logParsers: []
        }, options);
        if (_.isEmpty(this._options.hudsonUrl)) {
            throw new Error('Please specify a hudson URL (options.hudsonUrl)');
        }
    };

    /**
     *
     * @param callback
     */
    Jenkins.prototype.getJobs = function (callback) {
        request(this._buildUrl(), function (error, response, body) {
            if (error || response.statusCode !== 200) {
                callback(error || true, []);
            } else {
                callback(null, JSON.parse(body).jobs);
            }
        });
    };

    /**
     *
     * @param job
     * @param callback
     */
    Jenkins.prototype.getJob = function (job, callback) {
        request(this._buildUrl(JOB, job), function (error, response, body) {
            if (error || response.statusCode !== 200) {
                callback(error || true, {});
            } else {
                callback(null, JSON.parse(body));
            }
        });
    };

    /**
     *
     * @param job
     * @param build
     * @param callback
     */
    Jenkins.prototype.getBuild = function (job, build, callback) {
        request(this._buildUrl(BUILD, job, build), _.bind(function (error, response, body) {
            if (error || response.statusCode !== 200) {
                callback(error || true, {});
            } else {
                var data = JSON.parse(body);
                if (this._options.logParsers.length > 0) {
                    request(this._buildUrl(CONSOLE, job, build), _.bind(function (logError, logResponse, log) {
                        if (error || response.statusCode !== 200) {
                            callback(logError || true, {});
                        } else {
                            this._parseLog(log, data);
                            callback(null, data);
                        }
                    }, this));
                } else {
                    callback(null, data);
                }
            }
        }, this));
    };

    /**
     *
     * @param command
     * @returns {string}
     * @private
     */
    Jenkins.prototype._buildUrl = function (command) {
        var command = command || '',
            params = [],
            url = this._options.hudsonUrl + command + API;

        if (arguments.length > 1) {
            params = Array.prototype.slice.call(arguments).slice(1);
            params.unshift(url);
            url = util.format.apply(this, params);
        }

        return url;
    };

    /**
     *
     * @param log
     * @param data
     * @returns {*}
     * @private
     */
    Jenkins.prototype._parseLog = function (log, data) {
        _.each(this._options.logParsers, function (parser) {
            _.extend(data, parser.parse(log));
        });
        return data;
    };

    return Jenkins;

}());

module.exports = Jenkins;