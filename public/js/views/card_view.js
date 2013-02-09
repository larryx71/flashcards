App.views.CardView = Backbone.View.extend({
    className : 'cardContainer',
    tagName : 'div',

    questionTmpl :_.template($('#question-template').html()),

    events : {

    },

    render : function() {
        console.log('question = ' + this.model.get('question'));
        this.$el.html(this.questionTmpl({question : this.model.get('question')}));

        return this;
    }
});
