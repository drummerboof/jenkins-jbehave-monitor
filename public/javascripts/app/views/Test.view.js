JJBA.Views.Test = (function () {

    var Test = Backbone.View.extend({

        tagName: 'tr',

        initialize: function (options) {
            this.template = Handlebars.templates.test;
            //this.model.on('change', this.render, this);
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.addClass('test-row');
            return this;
        }

    });

    return Test;
}());
