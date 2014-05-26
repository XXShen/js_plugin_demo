module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-gh-pages');
    grunt.loadNpmTasks('grunt-contrib-clean');

    grunt.initConfig({
        'clean':{
            files: ['.grunt','build']
        },
        'copy': {
            main: {
                'src': [
                    '**/*.html',
                    '**/*.css',
                    '**/*.js',
                    '!Gruntfile.js',
                    '!build/**',
                    '!node_modules/**',
                    '!.*'
                ],
                'dest': 'build/'
            }
        },
        'gh-pages': {
            options: {
                base: 'build'
            },
            src: ['**']
        }
    });

    grunt.registerTask('default', ['clean','copy','gh-pages']);
};
