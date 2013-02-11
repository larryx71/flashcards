App.views.ListView = Backbone.View.extend({
    el : '#content',

    events : {

    },

    initialize : function() {
        App.pubsub.subscribe(App.events.ON_FILTER_SELECTED, this.onFilterSelected, this);
    },

    render : function() {
        this.clear()
            .updateUI()
            .initIsotope();

        return this;
    },

    updateUI : function() {
        var self = this;
        this.collection.each(function(card) {
            var cardView = new App.views.CardView({model:card});
            var $cardEl = cardView.render().$el;
            self.$el.append($cardEl);
        })

        return this;
    },

    filter : function(type) {
        this.$el.isotope({ filter: '.' + type });

        return this;
    },

    initIsotope : function() {
        this.$el.isotope({
            // options
            itemSelector : '.cardContainer',
            layoutMode : 'masonry'
        });

        return this;
    },

    clear : function() {
        this.$el.empty();

        return this;
    },

    onFilterSelected : function(selectedFilter) {
        this.filter(selectedFilter);
    }
});
