module.exports = function(grunt) {
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json')
    , jshint: {
      all: {
        options: {
          jshintrc: true
        }
        , src: [
          'public/**/*.js'
          , '!public/javascripts/vendor/*.js'
          // , 'test/**/*.js'
          // , '!test/vendor/*.js'
        ]

      }
    }
    , bowercopy: {
        libs: {
            options: {
                destPrefix: 'public/vendor'
            },
            files: {
              'requirejs.js': 'requirejs/require.js'
              ,'jquery.js': 'jquery/index.js'
              ,'modernizr.js': 'modernizr/index.js'
              ,'respond.js': 'respond/index.js'
              ,'lodash.min.js': 'lodash/dist/lodash.min.js'
              ,'normalize.css': 'normalize.css/normalize.css'
            }
        }
        ,
        test: {
            options: {
                destPrefix: 'test/vendor'
            },
            files: {
              'mocha.js': 'mocha/mocha.js'
              ,'mocha.css': 'mocha/mocha.css'
              ,'chai.js': 'chai/chai.js'
              ,'sinon.js': 'sinonjs/sinon.js'
            }
        }
      }
  });


  // Load grunt tasks from NPM packages
  require( "load-grunt-tasks" )( grunt );

  grunt.registerTask('bower', 'bowercopy');// alias for bowercopy
  grunt.registerTask('develop', ['jshint','bower']);

  grunt.registerTask('default', ['develop']);
};