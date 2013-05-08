JJBA.Views.Settings = (function () {

    var Settings = Backbone.Form.extend({

        events: {
            'click .submit': 'submit'
        },

        initialize: function (options) {
            return JJBA.Views.Settings.__super__.initialize(options);
        },

        submit: function () {
            this.commit();
        }

    });

    return Settings;
}());
