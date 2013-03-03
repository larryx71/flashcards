var User = Class.extend({
    init: function(userid){
        this._id = '';
        this.userid = userid;
        this.email = email;
        this.pwd = '';
        this.points = 0;
        this.deck_ids = '';
    },

    encryptPassword : function(password) {
        //do encryption of password
    }
});

/*
var user = {
    _id : '',
    email : '',
    pwd : '',
    deck_ids : '',
    points: '' //aggregated total
}
*/