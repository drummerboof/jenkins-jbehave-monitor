JJBA.Views.Test = (function () {

    var Test = Backbone.View.extend({

        detailsVisible: false,

        tagName: 'tr',

        events: {
            'click': '_onClick'
        },

        initialize: function (options) {
            this.template = Handlebars.templates.test;
            this.popover = Handlebars.templates.popover;
        },

        render: function () {
            this.$el.html(this.template(this.model.toJSON()));
            this.$el.addClass('test-row');
            this.delegateEvents();
            return this;
        },

        _onClick: function () {
            console.log('Clicked!');
            if (this.detailsVisible) {
                this.$el.next().remove();
                this.$el.removeClass('details');
            } else {
                this.$el.after(
                    $(this.popover(this.model.toJSON()))
                );
                this.$el.addClass('details');
            }
            this.detailsVisible = !this.detailsVisible;
        }

    });

    return Test;
}());
