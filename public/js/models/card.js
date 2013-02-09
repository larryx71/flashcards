App.models.Card = Backbone.Model.extend({
    defaults : {
        type : '',
        question : '',
        answer : '',
        note : '',
        visible : true
    }
});
