
/*
 * grunt-replace
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= mochaTest.test.src %>'
      ],
      options: {
        jshintrc: '.jshintrc'
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
        src: ['test/*_test.js']
      }
    },

    watch: {
      files: '<config:lint.all>',
      tasks: 'default'
    }

  });

  grunt.loadTasks('tasks');

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-mocha-test');

  grunt.registerTask('test', ['clean', 'replace', 'mochaTest']);
  grunt.registerTask('default', ['jshint', 'test']);

};
