App.models.Card = Backbone.Model.extend({
    defaults : {
        _id : '',
        types : [],
        question : '',
        answer : '',
        owner_id : '',
        userid : '',
        status : ''
    }
});
