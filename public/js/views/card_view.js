App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html()),

    events : {

    },

    initialize : function() {
    },

    render : function() {
        this.$el.html(this.questionTmpl({question : this.model.get('question')}));
        this.$el.addClass('all ' + this.model.get('type'));

        return this;
    }
});
