JJBA.Views.Summary = (function () {

    var Summary = Backbone.View.extend({

        el: '#Summary',

        initialize: function (options) {
            this.template = Handlebars.templates.summary;
            this.model.on('add', this.render, this);
        },

        render: function () {
            if (this.model.last()) {
                this.$el.html(this.template(this.model.last().toJSON()));
            }
            return this;
        }

    });

    return Summary;
}());
