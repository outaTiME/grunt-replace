'use strict';
module.exports = function (grunt) {
  grunt.initConfig({
    replace: {
      simple: {
        options: {
          variables: {
            key: 'value'
          }
        },
        files: [
          {
            expand: true, flatten: true, src: ['test/fixtures/simple.txt'], dest: 'temp'
          }
        ]
      },
      verbose: {
        options: {
          variables: {
            key: 'value'
          }
        },
        files: [
          {
            expand: true, flatten: true, src: ['test/fixtures/verbose.txt'], dest: 'temp'
          }
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
          {
            expand: true, flatten: true, src: ['test/fixtures/warning.txt'], dest: 'temp'
          }
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
          {
            expand: true, flatten: true, src: ['test/fixtures/fail.txt'], dest: 'temp'
          }
        ]
      },
      'built-in': {
        options: {
          // Pass
        },
        files: [
          {
            expand: true, flatten: true, src: ['test/fixtures/built-in_*.txt'], dest: 'temp'
          }
        ]
      }
    }
  });
  grunt.loadTasks('tasks');
  grunt.registerTask('default', ['replace:simple', 'replace:built-in']);
};
