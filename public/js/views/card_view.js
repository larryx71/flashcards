App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html()),

    events : {

    },

    initialize : function() {
        this.model.on('change:visible', this.updateDisplay, this);
    },

    render : function() {
        this.$el.html(this.questionTmpl({question : this.model.get('question')}));

        return this;
    },

    updateDisplay : function() {

    }
});
