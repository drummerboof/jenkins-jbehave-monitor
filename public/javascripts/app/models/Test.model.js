JJBA.Models.Test = (function () {

    var Test = Backbone.Model.extend({

        idAttribute: 'name',

        _scoreStart: 100,

        _scoreMultiplier: 0.5,

        defaults: function () {
            return {
                builds: [],
                score: 0,
                rate: 0,
                count: 0,
                mostRecent: 0
            };
        },

        initialize: function (attributes, options) {
            this.builds = options.builds;
            this.on('change:builds', this._onBuildsChange, this);
            this.on('change:latestBuild', this._onBuildsChange, this);
        },

        lastFailedBuild: function () {
            return _.max(this.get('builds'), function (build) {
                return build.number;
            });
        },

        _onBuildsChange: function (model, value) {
            var builds = this.get('builds'),
                lastFailedBuild = this.lastFailedBuild(),
                failedOnLastBuild = this.get('latestBuild') === lastFailedBuild.number;

            this.set({
                mostRecent: lastFailedBuild.number,
                score: this._calculateScore().toFixed(3),
                count: builds.length,
                rate: ((builds.length / this.builds.length) * 100).toFixed(0),
                failedOnLastBuild: failedOnLastBuild,
                mostRecentNode: lastFailedBuild.node
            });
        },

        _calculateScore: function () {
            var score = 0;
            _.each(this.get('builds'), function (build) {
                score += this._scoreMultiply(this.builds.latest() - build.number);
            }, this);
            return score;
        },

        _scoreMultiply: function (num) {
            var score = this._scoreStart;
            for (var i = 0; i < num; i++) {
                score = score * this._scoreMultiplier;
            }
            return score;
        }

    });

    return Test;

}());