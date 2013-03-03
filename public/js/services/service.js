App.service.Service = {
    _get : function(cmd, data) {
        return this._send('GET', cmd, data);
    },

    _post : function(cmd, data) {
        return this._send('POST', cmd, data);
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
        //FIXME:
        var deferred = $.Deferred();
        deferred.resolve();
        return deferred;

//        return this._delete('/cards/' + cardId, null);
    },

    addCard : function(card) {
        return this._post('/card', card);
    }
};