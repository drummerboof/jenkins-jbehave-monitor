JJBA.Views.Nodes = (function () {

    var Nodes = Backbone.View.extend({

        el: '#Nodes',

        _nodeMap: {
            'http://10.65.94.95:5555': 'DSA1',
            'http://10.65.94.95:5556': 'DSA2',
            'http://10.65.94.95:5557': 'DSA3',
            'http://10.65.94.95:5558': 'DSA4',
            'http://10.65.94.95:5559': 'DSA5',
            'http://10.65.94.95:5560': 'DSA6',
            'http://10.65.92.22:5555': 'RSG1',
            'http://10.65.92.22:5556': 'RSG2',
            'http://10.65.92.22:5557': 'RSG3',
            'http://10.65.92.22:5558': 'RSG4',
            'http://10.65.92.22:5559': 'RSG5',
            'http://10.65.92.22:5560': 'RSG6',
            'http://10.65.95.81:5555': 'IMAC1',
            'http://10.65.95.81:5556': 'IMAC2',
            'http://10.65.95.10:5555': 'PR1',
            'http://10.65.95.10:5556': 'PR2'
        },

        initialize: function (options) {
            this.template = Handlebars.templates.nodes;
            this.model.on('change', this.render, this);
        },

        /**
         * TODO: Clean this up a bit!
         *
         * @returns {*}
         */
        render: function () {
            var nodes = [];
            this.model.each(function (test) {
                _.each(test.get('builds'), function (build) {
                    if (_.isUndefined(build.node)) {
                        return;
                    }
                    var result = _.where(nodes, { node: build.node }),
                        node = result[0] || {
                            node: build.node,
                            tag: this._nodeMap[build.node],
                            failures: 0
                        };

                    node.failures++;
                    if (result.length === 0) {
                        nodes.push(node);
                    }
                }, this);
            }, this);
            var groupedNodes = _.groupBy(nodes, function (node) {
                return node.node.match(/http:\/\/([0-9\.]+):([0-9]+)/i)[1];
            });
            var properGroupedNodes = _.map(groupedNodes, function (value, key) {
                return {
                    ip: key,
                    children: value,
                    total: value.length === 1 ? value[0].failures : _.reduce(value, function (memo, node) {
                        return (memo.failures || memo) + node.failures;
                    })
                };
            });

            this.$el.html(this.template({ hosts: properGroupedNodes }));
            return this;
        }

    });

    return Nodes;
}());
