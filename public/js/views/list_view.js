App.views.ListView = Backbone.View.extend({
    el : '#content',

    events : {

    },

    initialize : function() {

    },

    render : function() {
        this.clear();
        this.destroyMasonry();
        this.initMasonry();

        this.updateUI();

        return this;
    },

    updateUI : function() {
        var self = this;
        this.collection.each(function(card) {
            if(card.get('visible')) {
                var cardView = new App.views.CardView({model:card});
                var $cardEl = cardView.render().$el;
                self.$el.append($cardEl).masonry('appended', $cardEl);
            }
        })
    },

    destroyMasonry : function() {
        this.$el.masonry( 'destroy' );
    },

    initMasonry : function() {
        this.$el.masonry({
            itemSelector: '.cardContainer',
            columnWidth: 320,
            isAnimated: true
        });
    },

    clear : function() {
        this.$el.empty();
    }
});
