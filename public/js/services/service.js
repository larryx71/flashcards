App.service.Service = {
    _get : function(cmd, data) {
        return this._send('GET', cmd, data);
    },

    _post : function(cmd, data) {
        return this._send('POST', cmd, data);
    },

    _put : function(cmd, data) {
        return this._send('PUT', cmd, data);
    },

    _delete : function(cmd, data) {
        return this._send('DELETE', cmd, data);
    },

    _send : function(method, cmd, data) {
        data = data || {};

        return $.ajax({
            url : cmd,
            type : method,
            dataType : 'json',
            data : data
        });
    },

    deleteCard : function(cardId) {
        //TODO: we should indicate from which deck the card is deleted
        return this._returnResolvedDeferredObj();

//        return this._delete('/cards/' + cardId, null);
    },

    addCard : function(card) {
        //TODO: we should indicate to which deck the card is added
        return this._post('/card', card);
    },

    addDeck : function(deck) {
        //NOTE: this should return an id of the newly created deck
        //TODO:
        return this._returnResolvedDeferredObj();

//        return this._post('/deck', deck);
    },

    deleteDeck : function(deckId) {
        //FIXME:
        return this._returnResolvedDeferredObj();

//        return this._delete('/deck/' + deckId, null);
    },

    editDeck : function(deckId, deck) {
        return this._returnResolvedDeferredObj();

//        return this._put('/deck/' + deckId, deck);
    },

    editCard : function(card, id) {
        //FIXME:
        return this._returnResolvedDeferredObj();

//        return this._put('/card/' + id, card);
    },

    _returnResolvedDeferredObj : function() {
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred;
    }
};