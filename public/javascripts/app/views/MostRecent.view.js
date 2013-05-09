JJBA.Views.MostRecent = (function () {

    var MostRecent = Backbone.View.extend({

        el: '#MostRecent',

        initialize: function (options) {
            this.template = Handlebars.templates.recent;
            this.model.on('add', this.render, this);
        },

        render: function () {
            var lastFailed = this.model.at(this.model.length-1),
                penultimateFailed = this.model.at(this.model.length-2);

            if (this.model.length === 0) {
                return this;
            }

            var failures = _.pluck(lastFailed.get('failedJBehaves'), 'name');

            if (!_.isUndefined(penultimateFailed)) {
                failures = _.difference(failures,
                    _.pluck(penultimateFailed.get('failedJBehaves'), 'name')
                );
            }

            if (failures.length > 0) {
                this.$el.html(this.template({
                    failures: failures,
                    count: failures.length,
                    latest: lastFailed.get('number')
                }));
                this.$el.show();
            } else {
                this.$el.hide();
            }
            return this;
        }

    });

    return MostRecent;
}());
