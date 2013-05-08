JJBA.Views.FailuresGraph = (function () {

    var FailuresGraph = Backbone.View.extend({

        el: '#Graph',

        _limit: 30,

        initialize: function (options) {
            this.model.on('change', this.render, this);
            this.model.on('add', this.render, this);
        },

        render: function (build) {
            if (_.isUndefined(this.chart)) {
                this.chart = new Highcharts.Chart({
                    chart: {
                        renderTo: this.el,
                        type: 'line',
                        borderColor: '#dddddd',
                        borderWidth: 1,
                        borderRadius: 5,
                        marginRight: 20,
                        marginBottom: 40
                    },
                    tooltip: {
                        formatter: function () {
                            var value = '<strong>Build ' + this.x + '</strong><br />' +
                                this.y + ' Failed Tests';
                            return value;
                        }
                    },
                    legend: {
                        enabled: false
                    },
                    title: {
                        text: 'Failing Tests'
                    },
                    yAxis: {
                        title: {
                            text: 'Failures'
                        }
                    },
                    xAxis: {
                        title: {
                            text: 'Build'
                        },
                        name: 'Build',
                        categories: []
                    },
                    series: [{
                        name: 'Failed Test',
                        data: []
                    }]
                });
            }

            var subset = this.model.last(this._limit);
            this.chart.series[0].setData(_.map(subset, function (model) {
                return model.get('failedJBehaves').length;
            }));
            this.chart.xAxis[0].setCategories(_.map(subset, function (model) {
                return model.get('number');
            }));

            return this;
        }

    });

    return FailuresGraph;
}());
