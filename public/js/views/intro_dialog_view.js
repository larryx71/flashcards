App.views.IntroDialogView = Backbone.View.extend({
    el : '#dialog_bg',

    events : {
        'click .big_button' : 'onContinue',
        'click .close' : 'onClose'
    },

    render : function() {
        var $dialog = this.$('#dialog').empty();
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

        $dialog.append(
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

        $types.chosen();



        return this;
    },

    show : function() {
        this.$el.show();
    },

    hide : function() {
        this.$el.hide();
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
