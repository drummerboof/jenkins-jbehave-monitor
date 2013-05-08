JJBA.Views.Tests = (function () {

    /**
     * TODO: Insert tests on add rather than re-rendering
     *
     * @type {*}
     */
    var Tests = Backbone.View.extend({

        el: '#Tests',

        events: {
            'click th': '_onHeaderClick'
        },

        _viewCache: {},

        initialize: function (options) {
            this.template = Handlebars.templates.tests;
            this.model.on('render', this._renderTests, this);
            this.model.on('change', this._renderTest, this);
            this.model.on('add', this._renderTest, this);
        },

        render: function () {
            this.$el.html(this.template({}));
            this._renderTests();
            return this;
        },

        _renderTests: function () {
            this.$('tbody').empty();
            this.model.each(function (model) {
                this.$('tbody').append(this._getTestView(model).render().el);
            }, this);
        },

        _renderTest: function (model) {
            var position = this.model.indexOf(model),
                view = this._getTestView(model);

            view.remove();
            var rows = this.$('tbody tr');
            if (rows.length === 0 || position >= rows.length) {
                this.$('tbody').append(view.render().el);
            } else {
                rows.eq(position).before(view.render().el);
            }
        },

        _getTestView: function (model) {
            if (_.isUndefined(this._viewCache[model.id])) {
                this._viewCache[model.id] = new JJBA.Views.Test({
                    model: model
                })
            }
            return this._viewCache[model.id];
        },

        _onHeaderClick: function (event) {
            var column = $(event.target).data('sort'),
                invert = !$(event.target).data('invert');
            console.log('Sorting: ', column, invert);
            this.model.sortByAndReset(column, invert);
            this.$('th').removeClass('asc desc');
            $(event.target).data({ invert: invert });
            $(event.target).addClass(invert ? 'desc' : 'asc');
        }

    });

    return Tests;
}());
