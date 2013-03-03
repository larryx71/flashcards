App.views.CreateCardDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),
    template :_.template($('#create-card-dialog-template').html() || ''),

    events : {
        'click .close' : 'hide',
        'click #questionContinueButton' : 'onQuestionEntered',
        'click #answerContinueButton' : 'onAnswerEntered',
        'click #categoryFinishButton' : 'onFinish'
    },

    initialize : function() {
        this.questionEntered = '';
        this.answerEntered = '';
        this.categoriesEntered = [];
    },

    render : function() {
        this.$el.html(this.modalTemplate());

        this.$('#dialog').html(this.template());

        var filterTypes = JSON.parse($('#types').val());
        filterTypes = _.map(filterTypes, function(type) {
            return '<option value="' + type + '">' + type + '</option>';
        });

        this.$('#createCardDialogCategories').html(filterTypes.join());

        return this;
    },

    show : function() {
        this.$('.chzn-select').chosen();
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    },

    onQuestionEntered : function() {
        var $createCardDialogQuestion = this.$('#createCardDialogQuestion');
        this.questionEntered = $createCardDialogQuestion.val();
        if(!this.questionEntered) {
            $createCardDialogQuestion.addClass('error');
        }
        else {
            this.$('.createCardDialogInnerContainer').animate({
                left : '-=400'
            }, 180);
        }
    },

    onAnswerEntered : function() {
        var $createCardDialogAnswer = this.$('#createCardDialogAnswer');
        this.answerEntered = $createCardDialogAnswer.val();

        if(!this.answerEntered) {
            $createCardDialogAnswer.addClass('error');
        }
        else {
            this.$('.createCardDialogInnerContainer').animate({
                left : '-=400'
            }, 180);
        }
    },

    onFinish : function() {
        var $createCardDialogCategories = this.$('#createCardDialogCategories');
        this.categoriesEntered = $createCardDialogCategories.val();

        this.createCard();
    },

    createCard : function() {
        var self = this;
        var card = {
            userid : App.session.email,
            question : this.questionEntered,
            answer : this.answerEntered,
            difficulty : 1,
            owner : App.session.email
        };

        App.service.Service.addCard(card).done(function(cards) {
            if(cards && cards.length > 0) {
                var newCard = new App.models.Card(cards[0]);
                App.session.cardCollection.push(newCard);
            }

            self.hide();
        }).fail(function(err) {
            console.log(err);
            this.hide();
        });
    }
});
