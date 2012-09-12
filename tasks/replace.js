
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
  
  grunt.registerMultiTask('replace', 'Replace inline patterns with defined variables.', function () {

    var
      path = require('path'),
      files = grunt.file.expandFiles(this.file.src),
      target = this.target,
      config = grunt.config(['replace', this.target]),
      dest = this.file.dest || '.',
      variables = config.variables,
      prefix = config.prefix,
      locals = {},
      processed = 0;
      
    if (typeof variables === 'object') {
      grunt.verbose.writeln('Using "' + target + '" replace variables options.');
    } else {
      grunt.verbose.writeln('Using master replacer variables options.');
      variables = grunt.config('replacer.variables') || {};
    }

    grunt.verbose.writeflags(variables, 'variables');

    if (typeof prefix === 'string') {
      grunt.verbose.writeln('Using "' + target + '" replace prefix options.');
    } else {
      grunt.verbose.writeln('Using master replacer prefix options.');
      prefix = grunt.config('replacer.prefix') || '@@';
    }
    
    prefix = grunt.template.process(prefix);
    
    grunt.verbose.writeflags(prefix, 'prefix');

    Object.keys(variables).forEach(function (variable) {
      var value = variables[variable];
      if (typeof value === 'string') {
        locals[grunt.template.process(variable)] = grunt.template.process(value);
      }
    });

    files.forEach(function (filepath, index) {
      var filename = path.basename(filepath), dest_filepath = path.join(dest, filename);
      grunt.file.copy(filepath, dest_filepath, {
        process: function (contents) {
          var updated = false;
          Object.keys(locals).forEach(function (local) {
            var re = new RegExp(prefix + local, "g"), value = locals[local];
            updated = updated || contents.match(re);
            contents = contents.replace(re, value);
          });
          if (updated) {
            grunt.log.writeln('Replace "' + filepath + '" > "' + dest_filepath + '"');
            processed++;
          } else {
            return false;
          }
          return contents;
        }
      });

    });

    if (processed === 0) {
      grunt.log.writeln('No documents updated.');
    }

  });

};
