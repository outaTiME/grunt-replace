
/*
 * grunt-replace
 *
 * Copyright (c) 2016 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function(grunt) {

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
          {expand: true, flatten: true, src: ['test/fixtures/simple.txt'],
            dest: 'tmp/'}
        ]
      },
      verbose: {
        options: {
          variables: {
            key: 'value'
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/verbose.txt'],
            dest: 'tmp/'}
        ]
      },
      warning: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            },
            {
              match: 'undefined-key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/warning.txt'],
            dest: 'tmp/'}
        ]
      },
      fail: {
        options: {
          pedantic: true,
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            },
            {
              match: 'undefined-key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/fail.txt'],
            dest: 'tmp/'}
        ]
      },
      'built-in': {
        options: {
          // pass
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/built-in_*.txt'],
            dest: 'tmp/'}
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
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', [
    'clean',
    'replace:simple',
    'replace:built-in',
    'mochaTest'
  ]);
  grunt.registerTask('default', [
    'jshint',
    'test'
  ]);

};
