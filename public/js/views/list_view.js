App.views.ListView = Backbone.View.extend({
    el : '#content',

    events : {

    },

    render : function() {
        var self = this;

        this.collection.each(function(card) {
            var cardView = new App.views.CardView({model:card});
            self.$el.append(cardView.render().$el);
        })

        this.initMasonry();
    },

    initMasonry : function() {
        this.$el.masonry({
            itemSelector: '.cardContainer',
            columnWidth: 320,
            isAnimated: true
        });
    }
});
