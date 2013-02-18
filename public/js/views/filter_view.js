App.views.FilterView = Backbone.View.extend({
    el : '#filterContainer',

    render : function() {
        var filterTypes = JSON.parse($('#types').val());
        var $select = $('<select />', {
            id : 'filter',
            'class' : 'chzn-select',
            width : 180,
            'data-placeholder' : 'Filter by technology'
        })
        .data('placeholder', 'Filter by technology');

        // iterate through all of the filterTypes and append them to the filter select control
        _.each(filterTypes, function(type) {
            $('<option />', {
                value : type
            }).text(type).appendTo($select)
        })

        this.$el.append($select);

        // Render the chosen ui component
        this.$(".chzn-select").chosen();
        this.setupFilterListener();

        return this;
    },

    setupFilterListener : function() {
        this.$('#filter').chosen().change(function(e) {
            var selectedFilter = $('#filter').find(':selected').val();

            App.pubsub.publish(App.events.ON_FILTER_SELECTED, selectedFilter);
        })
    }
});
