
/*
 * grunt-replace
 *
 * Copyright (c) 2015 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      options: {
        jshintrc: '.jshintrc'
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      tasks: {
        src: ['tasks/**/*.js']
      },
      test: {
        src: ['test/**/*.js']
      }
    },

    clean: {
      test: ['tmp']
    },

    replace: {
      simple: {
        options: {
          variables: {
            key: 'value'
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/simple.txt'], dest: 'tmp/'}
        ]
      },
      warning: {
        options: {
          patterns: [
            /* {
              match: 'key',
              replacement: 'value'
            }, */
            {
              match: 'undefined-key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/warning.txt'], dest: 'tmp/'}
        ]
      },
      'built-in': {
        options: {
          // pass
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/built-in_*.txt'], dest: 'tmp/'}
        ]
      }
    },

    mochaTest: {
      test: {
        options: {
          reporter: 'spec'
        },
        src: '<%= jshint.test.src %>'
      }
    },

    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      tasks: {
        files: '<%= jshint.tasks.src %>',
        tasks: ['jshint:src', 'mochaTest']
      },
      test: {
        files: '<%= jshint.test.src %>',
        tasks: ['jshint:test', 'mochaTest']
      }
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('test', ['clean', 'replace', 'mochaTest']);
  grunt.registerTask('default', ['jshint', 'test']);

};
