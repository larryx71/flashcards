var Flashcard = Class.extend({
    init: function(){
        this._id = '';
        this.difficulty = '';
        this.question = '';
        this.answer = '';
        this.comments = ''; //[ //{ts : '', content : '', user_id : ''}],
        this.votes = 0; //num
        this.is_public = true; //true / false,
        this.owner_id = '';
        this.creation_ts = '';
        this.last_modified = '';
    }
});

/*
var flashcard = {
    _id : '',
    owner : '',
    createDate : '',
    lastModifiedDate : '',
    difficulty : '',
    question : '',
    answer : '',
    comments : '', //[ //{ts : '', content : '', user_id : ''}],
    votes : '', //num
    is_public : '', //true / false,
    owner_id : '',
    creation_ts : '',
    last_modified : ''
}

*/