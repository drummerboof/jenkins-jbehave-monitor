JJBA.Views.App = (function () {

    var App = Backbone.View.extend({

        el: '#App',

        views: {},

        models: {},

        collections: {},

        initialize: function (options) {
            this.job = options.url.substr(1);
            this.collections.tests = new JJBA.Collections.Tests();
            this.collections.builds = new JJBA.Collections.Builds([], {
                job: this.job,
                io: options.io,
                tests: this.collections.tests
            });

            this.collections.builds.on('requested', function () {
                this.$('#LastUpdated').html('Last Updated: ' + new Date().toTimeString());
            }, this);

            this.views.tests = new JJBA.Views.Tests({
                model: this.collections.tests
            });
            this.views.graph = new JJBA.Views.FailuresGraph({
                model: this.collections.builds
            });
        },

        render: function () {
            this.views.graph.render();
            this.views.tests.render();
        }

    });

    return App;
}());
