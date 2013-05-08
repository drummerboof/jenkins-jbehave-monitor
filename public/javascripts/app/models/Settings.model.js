JJBA.Models.Settings = (function () {

    var Settings = Backbone.Model.extend({

        schema: {
            hudsonUrl: 'Text',
            job: 'Text',
            limit: 'Text'
        }

    });

    return Settings;

}());