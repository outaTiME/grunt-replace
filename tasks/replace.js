
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
  var fs = require('fs');

  // make directory path
  function mkdirp(_, path) {
    var parts = path.split("/");
    if( parts[0] == '' ) {
      parts = _.rest(parts);
    }
    _.reduce(parts, function(curPath, part) {
      try {
        fs.statSync(curPath);
      } catch(e) {
        fs.mkdirSync(curPath, 0777);
      }
      curPath = curPath + "/" + part;
      return curPath;
    });
  }

  grunt.registerMultiTask('replace', 'Replace inline patterns with defined variables.', function () {

    var
      path = require('path'),
      files = grunt.file.expandFiles(this.file.src),
      target = this.target,
      config = grunt.config(['replace', this.target]),
      dest = this.file.dest || '.',
      variables = config.variables,
      prefix = config.prefix,
      preserve_dirs = config.preserve_dirs,
      base_path = config.base_path,
      locals = {},
      processed = 0;

    if (typeof preserve_dirs === "undefined") {
      preserve_dirs = true;
    }

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
      var dirname = path.dirname(filepath), dest_dir, dest_filepath;

      if (preserve_dirs) {
        if (base_path) {
          dirname = dirname.replace(new RegExp('^'+base_path), '');
        }
        dest_dir = path.join(dest, dirname);
      } else {
        dest_dir = dest;
      }

      dest_filepath = path.join(dest_dir, path.basename(filepath));

      mkdirp(grunt.utils._, dest_dir);

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
