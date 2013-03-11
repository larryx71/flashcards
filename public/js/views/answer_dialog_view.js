App.views.AnswerDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template : _.template($('#card-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide',
        'click .saveButton' : 'saveCard'
    },

    render : function() {
        var question = this.model.get('question');
        var answer = this.model.get('answer');

        this.$el.html(this.modalTemplate());
        this.$('#dialog').html(this.template({question : question, answer : answer}));

        return this;
    },

    renderAdminUI : function() {
        var q = this.$('.q pre'),
            a = this.$('.a pre'),
            questionHeight = q.height(),
            answerHeight = a.height();

        q.hide();
        a.hide();
        this.$('.editQuestion').attr('rows', Math.ceil(questionHeight / 18) + 2).show();
        this.$('.editAnswer').attr('rows', Math.ceil(answerHeight / 18) + 2).show();

        $('<div />', {
            'id' : 'dialog_footer',
            'class' : 'clearFix'
        }).append(
            $('<div />', {
                'class' : 'big_button saveButton'
            }).css({
                'margin-top' : '15px',
                'float' : 'right'
            }).text('Save')
        ).appendTo($('#dialog'));
    },

    saveCard : function() {
        var self = this;
        var question = $('.editQuestion').val();
        var answer = $('.editAnswer').val();

        if(question && answer) {
            var newModelJSON = this.model.toJSON();
            newModelJSON['question'] = question;
            newModelJSON['answer'] = answer;

            App.service.Service.editCard(newModelJSON, this.model.get('_id')).done(function() {
                self.model.set(newModelJSON);

                self.hide();
            }).fail(function(err) {
                alert(err);
            });
        }
        else {
            alert('you must enter a valid question and answer');
        }
    },

    showAdminView : function() {
        this.$el.show();

        this.renderAdminUI();
        if(App.session.email) {
            if(this.model.get('owner_id') === App.session.email) {
                // this is the owner of this card, make the fields editable

            }
        }
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    }
});
