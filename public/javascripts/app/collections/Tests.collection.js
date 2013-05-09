JJBA.Collections.Tests = (function () {

    var Tests = Backbone.Collection.extend({

        _sort: {
            invert: false,
            key: 'count'
        },

        initialize: function (models, options) {
            this.on('change', function (model) {
                this.sort();
            }, this);
        },

        comparator: function (model1, model2) {
            var sort;
            if (this._sort.invert) {
                sort = model1.get(this._sort.key) - model2.get(this._sort.key);
            } else {
                sort = model2.get(this._sort.key) - model1.get(this._sort.key);
            }
            return sort;
        },

        sortByAndReset: function (attr, invert) {
            this._sort.key = attr;
            this._sort.invert = invert;
            this.sort();
            this.trigger('render');
        }

    });

    return Tests;

}());