App.views.ListView = Backbone.View.extend({
    el : '#content',

    events : {

    },

    initialize : function() {
        App.session.cardCollection.on('add', this.onModelAdded, this);

        App.pubsub.subscribe(App.events.ON_FILTER_SELECTED, this.onFilterSelected, this);
        App.pubsub.subscribe(App.events.CARD_DELETED, this.removeCard, this);
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

            // Dynamically determine the width and height of the card container,
            // as well as the answer div, we need to do this for the flip animation
            var $question = $cardEl.find('.question');
            $cardEl.width(($question.width() + 20) + 'px');
            $cardEl.height(($question.height() + 20) + 'px');
            $cardEl.find('.answer').height($question.height());
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
    },

    removeCard : function($card) {
        this.$el.isotope( 'remove', $card );
    },

    onModelAdded : function(card) {
        var $hiddenDiv = $('#hiddenDiv');

        var cardView = new App.views.CardView({model:card});
        var $cardEl = cardView.render().$el;

        // This is a hack, we have to insert it into a hidden div first so we can accurately
        // measure its height, once we get the height, we will clone the inserted div
        // and remove it from the hidden div and insert it into the right container
        $hiddenDiv.append($cardEl);

        // Dynamically determine the width and height of the card container,
        // as well as the answer div, we need to do this for the flip animation
        var $question = $cardEl.find('.question');
        $cardEl.width(($question.width() + 20) + 'px');
        $cardEl.height(($question.height() + 20) + 'px');
        $cardEl.find('.answer').height($question.height());

        $cardEl = $cardEl.clone(true);
        $hiddenDiv.empty();
        this.$el.isotope('insert', $cardEl);
    }
});
