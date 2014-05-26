module.exports = function (grunt) {
    grunt.loadNpmTasks('grunt-gh-pages');

    grunt.initConfig({
        'gh-pages': {
            options: {
                base: '.'
            },
            src: ['**']
        }
    });

    grunt.registerTask('default', 'gh-pages');
};