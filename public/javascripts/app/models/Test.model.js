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
        },

        _onBuildsChange: function (model, value) {
            this.set({
                mostRecent: _.max(value),
                score: this._calculateScore().toFixed(3),
                count: value.length,
                rate: ((value.length / this.builds.length) * 100).toFixed(0)
            });
        },

        _calculateScore: function () {
            var score = 0;
            _.each(this.get('builds'), function (build) {
                score += this._scoreMultiply(this.builds.latestBuild - build);
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