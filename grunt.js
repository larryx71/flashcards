module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        concat: {
            entities : {
                src: ['public/js/entity/Class.js',
                      'public/js/entity/Deck.js',
                      'public/js/entity/Flashcard.js',
                      'public/js/entity/Type.js',
                      'public/js/entity/User.js'
                     ],
                dest: 'build/js/entities.js'
            }
        },
        watch: {
            scripts: {
                files: '<concat.entities>',
                tasks: 'default'
            }
        }
    });

    // Default task.
    grunt.registerTask('default', 'concat');

};