App.models.Deck = Backbone.Model.extend({
    defaults : {
        id : 0,
        name : '',
        description : '',
        cards : []
    }
});
