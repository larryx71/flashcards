module.exports = function(grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        concat: {
            all : {
                src: [
                    'public/js/events/*.js',
                    'public/js/models/*.js',
                    'public/js/services/*.js',
                    'public/js/utils/*.js',
                    'public/js/views/*.js'],
                dest: 'public/js/all.js'
            }
        },
        uglify: {
            // uglify task configuration goes here.
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');

    grunt.registerTask('default', ['concat']);
};
