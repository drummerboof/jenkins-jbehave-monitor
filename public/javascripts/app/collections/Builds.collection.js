JJBA.Collections.Builds = (function () {

    var Builds = Backbone.Collection.extend({

        comparator: 'number',

        _buildLimit: 50,

        _requestTimeout: 300,

        initialize: function (models, options) {
            this.job = options.job;
            this.tests = options.tests;
            this.socket = options.io.connect('/', 3000);
            this.on('add', function (model) {
                this._onBuildAdd(model);
            }, this);
            this.socket.on('connect', _.bind(this._onSocketConnect, this));
            this.socket.on('build', _.bind(this._onSocketReceive, this));
            this.socket.on('disconnect', _.bind(this._onSocketDisconnect, this));

        },

        poll: function () {
            console.log('Requesting builds...');
            this.socket.emit('builds', {
                job: this.job,
                since: this.latest()
            });
            setTimeout(_.bind(this.poll, this), this._requestTimeout * 1000);
            this.trigger('requested');
        },

        latest: function () {
             var max = this.max(function (build) {
                 return build.get('number');
             })
             return max.get ? max.get('number') : 0;
        },

        _onSocketReceive: function (build) {
            console.log('Build received: ', build.number);
            this.add(build);
        },

        _onSocketConnect: function () {
            console.log('Socket connected...');
            this.poll();
        },

        _onSocketDisconnect: function () {
            console.log('Socket disconnected!');
        },

        _onBuildAdd: function (build) {
            if (build.get('failedJBehaves') && build.get('failedJBehaves').length > 0) {
                _.each(build.get('failedJBehaves'), function (testData) {
                    var test = this.tests.get(testData.name) || new JJBA.Models.Test(testData, {
                            builds: this
                        }),
                        builds = test.get('builds').concat();
                    builds.push(build.get('number'));
                    test.set({
                        builds: builds
                    });
                    this.tests.add(test, { merge: true });
                }, this);
            }
            this.tests.each(function (test) {
                test.set({ latestBuild: this.latest() });
            }, this);
        }

    });

    return Builds;

}());