
/*
 *  Copyright 2012 outaTiME.
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 */

module.exports = function (grunt) {
  'use strict';

  // Project configuration.
  grunt.initConfig({

    lint: {
      all: ['grunt.js', 'tasks/*.js', '<config:nodeunit.tasks>']
    },

    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        boss: true,
        eqnull: true,
        node: true,
        es5: true
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    replace: {
      simple: {
        src: ['test/fixtures/simple.txt'],
        dest: 'tmp',
        variables: {
          key: 'value'
        }
      },
      prefix: {
        src: ['test/fixtures/prefix.txt'],
        dest: 'tmp',
        variables: {
          key: 'value'
        },
        prefix: '@replace:'
      },
      dynamic_key: {
        src: ['test/fixtures/dynamic_key.txt'],
        dest: 'tmp',
        variables: {
          '<%= "key" %>': 'value'
        }
      },
      dynamic_value: {
        src: ['test/fixtures/dynamic_value.txt'],
        dest: 'tmp',
        variables: {
          key: '<%= grunt.template.today("yyyy") %>'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tasks: ['test/*_test.js']
    },

    watch: {
      files: '<config:lint.all>',
      tasks: 'default'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // The clean plugin helps in testing.
  grunt.loadNpmTasks('grunt-contrib-clean');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.renameTask('test', 'nodeunit');
  grunt.registerTask('test', 'clean replace nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', 'lint test');

};
