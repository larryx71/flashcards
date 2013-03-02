App.views.IntroDialogView = Backbone.View.extend({
    tagName : 'div',
    id : 'dialog_bg',

    modalTemplate :_.template($('#modal-template').html() || ''),

    events : {
        'click .big_button' : 'onContinue',
        'click .close' : 'onClose'
    },

    render : function() {
        var types = JSON.parse($('#types').val());
        var $types = $('<select />', {
            id : 'interested_types',
            'class' : 'chzn-select',
            width : '380px',
            multiple : 'true'
        });

        _.each(types, function(type) {
            $('<option />', {
                value : type
            }).text(type).appendTo($types)
        });

        this.$el.html(this.modalTemplate());

        this.$('#dialog').append(
            $('<p />').text('What technologies are you interested in?')
        ).append($types).append(
            $('<div />', {
                'class' : 'big_button'
            }).text('Continue').css({
                'position' : 'absolute',
                'right' : 20,
                'bottom' : 20
            })
        ).append(
            $('<div />', {
                'class' : 'close'
            }).text('✕')
        );

        return this;
    },

    show : function() {
        this.$('.chzn-select').chosen();
        this.$el.show();
    },

    hide : function() {
        this.$el.hide().remove();
    },

    onContinue : function() {
        var seedTypeArray = $('#interested_types').val() || [];
        var seedTypes = seedTypeArray.join(',');

        $('#seedTypes').val(seedTypes);
        $('#main_form').submit();
    },

    onClose : function() {
        this.hide();
    }
});
