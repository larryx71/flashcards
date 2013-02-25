App.models.Card = Backbone.Model.extend({
    defaults : {
        id : '',
        types : [],
        question : '',
        answer : '',
        owner : ''
    }
});
