
/*
 * grunt-replace
 * http://gruntjs.com/
 *
 * Copyright (c) 2014 outaTiME
 * Licensed under the MIT license.
 * https://github.com/outaTiME/grunt-replace/blob/master/LICENSE-MIT
 */

module.exports = function (grunt) {

  'use strict';

  // Project configuration.
  grunt.initConfig({

    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      test: ['tmp']
    },

    // Configuration to be run (and then tested).
    replace: {
      simple: {
        options: {
          variables: {
            'key': 'value'
          }
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/simple.txt'], dest: 'tmp/'}
        ]
      },
      template_key: {
        options: {
          patterns: [
            {
              match: '<%= "key" %>',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/template_key.txt'], dest: 'tmp/'}
        ]
      },
      template_value: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: '<%= grunt.template.date(847602000000, "yyyy") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/template_value.txt'], dest: 'tmp/'}
        ]
      },
      cwd: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, cwd: 'test/fixtures/cwd/', src: ['**/*.txt'], dest: 'tmp/cwd/'}
        ]
      },
      flatten: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/flatten/**/*.txt'], dest: 'tmp/flatten/'}
        ]
      },
      force: {
        options: {
          force: true
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/force.txt'], dest: 'tmp/'}
        ]
      },
      doc_cache: {
        options: {
          patterns: [
            {
              match: 'year',
              replacement: '<%= grunt.template.today("yyyy") %>'
            }
          ]
        },
        files: [
          {src: ['test/fixtures/cache.html'], dest: 'tmp/cache.html'}
        ]
      },
      doc_include: {
        options: {
          patterns: [
            {
              match: 'include',
              replacement: '<%= grunt.file.read("test/fixtures/content.txt") %>'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/include.txt'], dest: 'tmp/'}
        ]
      },
      escape: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: '$$\''
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/escape.txt'], dest: 'tmp/'}
        ]
      },
      special_chars: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'detta är en sträng'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/special_chars.txt'], dest: 'tmp/'}
        ]
      },
      fn: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: function () {
                return 'value';
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/function.txt'], dest: 'tmp/'}
        ]
      },
      new_way: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value',
              expression: false
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/new_way.txt'], dest: 'tmp/'}
        ]
      },
      regexp: {
        options: {
          patterns: [
            {
              match: /@@key/g,
              replacement: 'value',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/regexp.txt'], dest: 'tmp/'}
        ]
      },
      regexp_template: {
        options: {
          patterns: [
            {
              match: '/@@<%= "key" %>/g',
              replacement: 'value',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/regexp_template.txt'], dest: 'tmp/'}
        ]
      },
      doc_regexp: {
        options: {
          patterns: [
            {
              match: /(\w+)\s(\w+)/,
              replacement: '$2, $1',
              expression: true
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/username.txt'], dest: 'tmp/'}
        ]
      },
      json: {
        options: {
          patterns: [
            {
              json: {
                "key": "value"
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json.txt'], dest: 'tmp/'}
        ]
      },
      json_external: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external.txt'], dest: 'tmp/'}
        ]
      },
      json_external_nested: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_nested.txt'], dest: 'tmp/'}
        ]
      },
      json_external_nested_object: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_nested_object.txt'], dest: 'tmp/'}
        ]
      },
      json_external_template_value: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_external_template_value.txt'], dest: 'tmp/'}
        ]
      },
      array: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: [1, 2, 3, 4]
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/array.txt'], dest: 'tmp/'}
        ]
      },
      array_template_value: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: [ '<%= grunt.template.date(847602000000, "yyyy") %>' ]
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/array_template_value.txt'], dest: 'tmp/'}
        ]
      },
      object: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: {
                foo: 'bar'
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/object.txt'], dest: 'tmp/'}
        ]
      },
      object_template_value: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: {
                foo: '<%= "bar" %>'
              }
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/object_template_value.txt'], dest: 'tmp/'}
        ]
      },
      object_angular: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: grunt.file.readJSON('test/fixtures/object_angular.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/object_angular.txt'], dest: 'tmp/'}
        ]
      },

      // sort

      sort: {
        options: {
          patterns: [
            {
              match: 'smaller',
              replacement: '2'
            },
            {
              match: 'small',
              replacement: '1'
            },
            {
              match: 'smallest',
              replacement: '3'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/sort.txt'], dest: 'tmp/'}
        ]
      },
      json_sort: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/json_sort.json')
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/json_sort.txt'], dest: 'tmp/'}
        ]
      },
      multiple_replacement: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/multiple_replacement.json')
            },
            {
              match: /@@smallest/g,
              replacement: 'regex-3a'
            },
            {
              match: 'smallest',
              replacement: '3a'
            },
            {
              match: /@@smaller/g,
              replacement: 'regex-2a'
            },
            {
              match: 'smaller',
              replacement: '2a'
            },
            {
              match: /@@small/g,
              replacement: 'regex-1a'
            },
            {
              match: 'small',
              replacement: '1a'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/multiple_replacement.txt'], dest: 'tmp/'}
        ]
      },

      // usePrefix

      prefix: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ],
          prefix: '@replace:'
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/prefix.txt'], dest: 'tmp/'}
        ]
      },

      use_prefix: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ],
          usePrefix: false
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/use_prefix.txt'], dest: 'tmp/'}
        ]
      },

      // preservePrefix

      preserve_prefix: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: 'value'
            }
          ],
          preservePrefix: true
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/preserve_prefix.txt'], dest: 'tmp/'}
        ]
      },
      preserve_prefix_function: {
        options: {
          patterns: [
            {
              match: 'key',
              replacement: function () {
                return 'value';
              }
            }
          ],
          preservePrefix: true
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/preserve_prefix_function.txt'], dest: 'tmp/'}
        ]
      },
      preserve_prefix_regexp: {
        options: {
          patterns: [
            {
              match: /@@key/g,
              replacement: 'value'
            }
          ],
          preservePrefix: true
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/preserve_prefix_regexp.txt'], dest: 'tmp/'}
        ]
      },

      // delimiter

      delimiter: {
        options: {
          patterns: [
            {
              json: grunt.file.readJSON('test/fixtures/config.json')
            }
          ],
          delimiter: '-'
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/delimiter.txt'], dest: 'tmp/'}
        ]
      },

      // built-in

      'built-in': {
        options: {
          // pass
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/built-in_*.txt'], dest: 'tmp/'}
        ]
      },

      // yaml

      yaml: {
        options: {
          patterns: [
            {
              yaml: 'key: value'
            }
          ]
        },
        files: [
          {expand: true, flatten: true, src: ['test/fixtures/yaml.txt'], dest: 'tmp/'}
        ]
      }

    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    },

    watch: {
      files: '<config:lint.all>',
      tasks: 'default'
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // Load helper plugins for testing.
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the 'test' task is run, first clean the 'tmp' dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'replace', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint', 'test']);

};
