App.views.HeaderView = Backbone.View.extend({
    el : '#header',

    template :_.template($('#header-template').html() || ''),

    events : {
        'click .boards' : 'toggleBoards'
    },

    initialize : function() {
        this.$subHeader = $('#sub_header_div');
        this.$subHeaderInner = $('#sub_header_div_inner');
    },

    render : function() {
        this.$el.html(this.template());

        return this;
    },

    toggleBoards : function() {
        if(!this.$subHeader.hasClass('on')) {
            this.$subHeaderInner.empty();

            var boards = [
                {
                    name : 'Clientside',
                    id : 1
                },
                {
                    name : 'Serverside',
                    id : 2
                },
                {
                    name : 'Algorithm',
                    id : 3
                }
            ];

            for(var i = 0; i < boards.length; i++) {
                var board = boards[i];

                $('<div />', {
                    'class' : 'sub_header_board_container'
                })
                    .data('id', board.id)
                    .text(board.name)
                    .appendTo(this.$subHeaderInner);
            }

            this.$subHeader.animate({
                height : '90'
            }, 180);
        }
        else {
            this.$subHeader.animate({
                height : '0'
            }, 180);
        }

        this.$subHeader.toggleClass('on');
        this.$('.boards').toggleClass('on');
    }
});
